package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.UserRankingResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import com.ssapin.backend.api.domain.repositorysupport.*;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService {

    private final MapRepository mapRepository;
    private final MapPlaceRepositorySupport mapPlaceRepositorySupport;
    private final MapRepositorySupport mapRepositorySupport;
    private final CampusRepository campusRepository;
    private final HashtagRepository hashtagRepository;
    private final MapHashtagRepositorySupport mapHashtagRepositorySupport;
    private final MapHashtagRepository mapHashtagRepository;
    private final MapRankingRepositorySupport mapRankingRepositorySupport;
    private final MapBookmarkRepository mapBookmarkRepository;
    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;
    private final UserRankingRepositorySupport userRankingRepositorySupport;
    private final ReviewRepositorySupport reviewRepositorySupport;

    @Override
    @Transactional
    public Long createMap(User user, MapRequest.MapRegister mapRegister) {
        //Map 저장
        Campus campus = campusRepository.findById(mapRegister.getCampusId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Map map = Map.builder()
                .user(user)
                .access(mapRegister.getAccess())
                .campus(campus)
                .emoji(mapRegister.getEmoji())
                .title(mapRegister.getTitle())
                .build();
        Map result = mapRepository.save(map);

        //HashTag 저장
        for (HashtagRequest hashtag : mapRegister.getHashtagList()) {
            Hashtag hashTag = hashtagRepository.findById(hashtag.getHashtagId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
            MapHashtag mapHashtag = MapHashtag.builder()
                    .hashtag(hashTag)
                    .map(result)
                    .build();
            mapHashtagRepository.save(mapHashtag);
        }

        return result.getId();
    }

    @Override
    @Transactional
    public Long updateMap(MapRequest.MapEdit mapEdit) {
        Map map = mapRepository.findById(mapEdit.getMapId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Campus campus = campusRepository.findById(mapEdit.getCampusId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Map updatedMap = map.update(campus, mapEdit.getTitle(), mapEdit.getAccess(), mapEdit.getEmoji());

        //원래 sticker
        List<MapHashtag> list = mapHashtagRepositorySupport.findAllByMap(map);
        List<Hashtag> originHashtagList = new ArrayList<>();
        List<Hashtag> deleteHashtagList = new ArrayList<>();
        for (MapHashtag maphashTag : list) {
            originHashtagList.add(maphashTag.getHashtag());
            deleteHashtagList.add(maphashTag.getHashtag());
        }

        //변경된 sticker
        List<HashtagRequest> newHashtagList = mapEdit.getHashtagList();
        Collections.sort(newHashtagList);
        List<Hashtag> updateHashTagList = new ArrayList<>();
        List<Hashtag> newHashTagList = new ArrayList<>();
        for (HashtagRequest hashtagId : newHashtagList) {
            Hashtag hashtag = hashtagRepository.findById(hashtagId.getHashtagId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
            updateHashTagList.add(hashtag);
            newHashTagList.add(hashtag);
        }

        if (!updateHashTagList.equals(originHashtagList)) {
            updateHashTagList.removeAll(originHashtagList);
            deleteHashtagList.removeAll(newHashTagList);

            if (deleteHashtagList.size() != 0) {
                for (Hashtag hashtag : deleteHashtagList) {
                    MapHashtag mapHashtag = mapHashtagRepositorySupport.findByMapAndHashtag(map, hashtag);
                    mapHashtagRepository.delete(mapHashtag);
                }
            }

            if (updateHashTagList.size() != 0) {
                for (Hashtag hashtag : updateHashTagList) {
                    mapHashtagRepository.save(new MapHashtag(hashtag, map));
                }
            }
        }

        return updatedMap.getId();
    }

    @Override
    @Transactional
    public void deleteMap(long mapId) {
        Map map = mapRepository.findById(mapId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        mapRepository.delete(map);
    }

    @Override
    public MapResponse detailMap(long mapId, User user, boolean isList) {
        Map map = mapRepository.findById(mapId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        boolean bookMark = false;
        if (user != null) bookMark = mapBookmarkRepository.existsMapBookmarkByMapAndUser(map, user);
        List<MapHashtag> list = mapHashtagRepositorySupport.findAllByMap(map);
        List<HashtagRequest> hashtagList = new ArrayList<>();
        for (MapHashtag mapHashtag : list) {
            hashtagList.add(new HashtagRequest(mapHashtag.getHashtag().getId()));
        }

        List<MapPlace> mapPlaceList = mapPlaceRepositorySupport.findByMap(map);
        if (mapPlaceList.isEmpty()) {
            return new MapResponse(map, null, hashtagList, bookMark, isList);
        } else {
            List<PlaceResponse> placeList = new ArrayList<>();
            for (MapPlace mapPlace : mapPlaceList) {
                List<Review> review = reviewRepositorySupport.findAllByPlace(mapPlace.getPlace());
                if(review.isEmpty()) placeList.add(new PlaceResponse(mapPlace.getPlace(), null, mapPlace.getUser()));
                else placeList.add(new PlaceResponse(mapPlace.getPlace(), review.get(0).getContent(), mapPlace.getUser()));
            }
            return new MapResponse(map, placeList, hashtagList, bookMark, isList);
        }
    }

    @Override
    public Page<MapResponse> getMapList(long campusId, List<Long> hashtagList, String keyword, User user, Pageable pageable) {
        List<MapResponse> mapResponseList = new ArrayList<>();
        Campus campus = campusRepository.findById(campusId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<Map> mapList = mapRepositorySupport.findAllByFiltering(campus, hashtagList, keyword);
        for (Map map : mapList) {
            mapResponseList.add(detailMap(map.getId(), user, true));
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), mapResponseList.size());
        Page<MapResponse> result = new PageImpl<>(mapResponseList.subList(start, end), pageable, mapResponseList.size());
        return result;
    }

    @Override
    public List<MapResponse> getRankingList(long campusId, User user) {
        List<MapResponse> mapResponseList = new ArrayList<>();
        Campus campus = campusRepository.findById(campusId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        List<Map> mapList = mapRankingRepositorySupport.findAllByCampus(campus);
        for (Map map : mapList) {
            mapResponseList.add(detailMap(map.getId(), user, true));
        }
        return mapResponseList;
    }



    @Override
    public void addBookmark(User user, long mapId) {
        Map map = mapRepository.findById(mapId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        MapBookmark bookmark = MapBookmark.builder()
                .map(map)
                .user(user)
                .build();
        mapBookmarkRepository.save(bookmark);
    }

    @Override
    @Transactional
    public void deleteBookmark(User user, long mapId) {
        Map map = mapRepository.findById(mapId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        MapBookmark mapBookmark = mapBookmarkRepositorySupport.findByMapBookmark(map, user);
        mapBookmarkRepository.delete(mapBookmark);
    }

    @Override
    @Transactional
    public List<UserRankingResponse> get5UserByCampus(long campusId) {
        Campus campus = campusRepository.findById(campusId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return userRankingRepositorySupport.findUsersByCampus(campus);
    }

    @Override
    @Transactional
    public List<Map> get6MapsByCampus(long campusId) {
        Campus campus = campusRepository.findById(campusId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return mapRankingRepositorySupport.findMapsByCampus(campus);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map> getMapListByUserId(long userId) {
        return mapRepositorySupport.findAllByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getMapCntByUserId(long userId) {
        return mapRepositorySupport.countMapByUserId(userId);
    }
}
