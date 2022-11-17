package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapBookmark;
import com.ssapin.backend.api.domain.entity.MapPlace;
import com.ssapin.backend.api.domain.repositorysupport.MapBookmarkRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.MapPlaceRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MapPlaceServiceImpl implements MapPlaceService{

    private final MapPlaceRepositorySupport mapPlaceRepositorySupport;
    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;
    @Override
    @Transactional(readOnly = true)
    public long getMapPlaceCntByUserId(long userId) {
        return mapPlaceRepositorySupport.countMapPlaceByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getMapPlaceCntByMapId(long mapId) {
        return mapPlaceRepositorySupport.countMapPlaceByMapId(mapId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUserCntByMapId(long mapId) {
        return mapPlaceRepositorySupport.countParticipantByMapId(mapId);
    }


    @Override
    @Transactional(readOnly = true)
    public long getParticipateCntByUserId(long userId) {
        return mapPlaceRepositorySupport.countParticipationByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Map> getJoinMapListByUserId(long userId) {

        List<MapPlace> mapPlaceList = mapPlaceRepositorySupport.findParticipateMapsByUserId(userId);
        Set<Map> mapSet = new HashSet<>();

        for (MapPlace mapPlace : mapPlaceList) mapSet.add(mapPlace.getMap());

        return new ArrayList<>(List.copyOf(mapSet));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse.Map> findBookmarkedMapList(List<MapBookmark> mapBookmarkList) {

        List<UserResponse.Map> bookmarkedMapList = new ArrayList<>();

        for (MapBookmark mapBookmark : mapBookmarkList) {

            Map map = mapBookmark.getMap();
            long placeCnt = getMapPlaceCntByMapId(map.getId());
            long bookmarkCnt = mapBookmarkRepositorySupport.countMapBookmarkByMapId(map.getId());
            UserResponse.Map bookmarkedMap = UserResponse.Map.builder()
                    .mapId(map.getId())
                    .userId(map.getUser().getId())
                    .title(map.getTitle())
                    .mapEmoji(map.getEmoji())
                    .userEmoji(map.getUser().getEmoji())
                    .nickname(map.getUser().getNickname())
                    .placeCnt(placeCnt)
                    .bookmarkCnt(bookmarkCnt)
                    .access(map.isAccess())
                    .build();

            bookmarkedMapList.add(bookmarkedMap);
        }
        return bookmarkedMapList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse.Map> findMyMapList(List<Map> mapList) {


        List<UserResponse.Map> myMapList = new ArrayList<>();

        for (Map map : mapList) {

            long placeCnt = getMapPlaceCntByMapId(map.getId());
            long bookmarkCnt = mapBookmarkRepositorySupport.countMapBookmarkByMapId(map.getId());
            UserResponse.Map myMap = UserResponse.Map.builder()
                    .mapId(map.getId())
                    .userId(map.getUser().getId())
                    .title(map.getTitle())
                    .mapEmoji(map.getEmoji())
                    .userEmoji(map.getUser().getEmoji())
                    .nickname(map.getUser().getNickname())
                    .placeCnt(placeCnt)
                    .bookmarkCnt(bookmarkCnt)
                    .access(map.isAccess())
                    .build();

            myMapList.add(myMap);
        }

        return myMapList;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse.Map> findJoinMapList(List<Map> mapList) {

        List<UserResponse.Map> joinMapList = new ArrayList<>();

        for (Map map : mapList) {

            long placeCnt = getMapPlaceCntByMapId(map.getId());
            long bookmarkCnt = mapBookmarkRepositorySupport.countMapBookmarkByMapId(map.getId());
            UserResponse.Map joinMap = UserResponse.Map.builder()
                    .mapId(map.getId())
                    .userId(map.getUser().getId())
                    .title(map.getTitle())
                    .mapEmoji(map.getEmoji())
                    .userEmoji(map.getUser().getEmoji())
                    .nickname(map.getUser().getNickname())
                    .placeCnt(placeCnt)
                    .bookmarkCnt(bookmarkCnt)
                    .access(map.isAccess())
                    .build();

            joinMapList.add(joinMap);
        }

        return joinMapList;
    }
}