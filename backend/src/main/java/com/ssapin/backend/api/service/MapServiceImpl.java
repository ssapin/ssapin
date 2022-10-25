package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import com.ssapin.backend.api.domain.repositorysupport.HashtagRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.MapHashtagRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapPlaceRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService {

    private final MapRepository mapRepository;
    private final CampusRepository campusRepository;
    private final HashtagRepository hashtagRepository;
    private final MapHashtagRepositorySupport mapHashtagRepositorySupport;
    private final MapHashtagRepository mapHashtagRepository;

    @Override
    public Long createMap(User user, MapRequest.MapRegister mapRegister) {
        //Map 저장
        Campus campus = campusRepository.findById(mapRegister.getCampusId()).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND));
        Map map = Map.builder()
                .user(user)
                .access(mapRegister.getAccess())
                .campus(campus)
                .emoji(mapRegister.getEmoji())
                .title(mapRegister.getTitle())
                .build();
        Map result = mapRepository.save(map);

        //HashTag 저장
        for(HashtagRequest hashtag : mapRegister.getHashtagList()) {
            Hashtag hashTag = hashtagRepository.findById(hashtag.getHashtagId()).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND));
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
        for(MapHashtag maphashTag : list) {
            originHashtagList.add(maphashTag.getHashtag());
            deleteHashtagList.add(maphashTag.getHashtag());
        }

        //변경된 sticker
        List<HashtagRequest> newHashtagList = mapEdit.getHashtagList();
        List<Hashtag> updateHashTagList = new ArrayList<>();
        for(HashtagRequest hashtagId : newHashtagList) {
            Hashtag hashtag = hashtagRepository.findById(hashtagId.getHashtagId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
            updateHashTagList.add(hashtag);
        }

        Collections.sort(newHashtagList);
        if(!newHashtagList.equals(originHashtagList)) {
            updateHashTagList.removeAll(originHashtagList);
            deleteHashtagList.removeAll(newHashtagList);

            if(deleteHashtagList.size()!=0) {
                for(Hashtag hashtag : deleteHashtagList) {
                    MapHashtag mapHashtag = mapHashtagRepositorySupport.findByMapAndHashtag(map, hashtag);
                    mapHashtagRepository.delete(mapHashtag);
                }
            }

            if(updateHashTagList.size()!=0) {
                for(Hashtag hashtag : updateHashTagList) {
                    mapHashtagRepository.save(new MapHashtag(hashtag, map));
                }
            }
        }

        return updatedMap.getId();
    }
}
