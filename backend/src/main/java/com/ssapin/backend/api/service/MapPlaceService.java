package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapBookmark;

import java.util.List;

public interface MapPlaceService {
    long getMapPlaceCntByUserId(long userId);
    long getMapPlaceCntByMapId(long mapId);
    long getParticipateCntByUserId(long userId);
    long getUserCntByMapId(long mapId);
    List<Map> getJoinMapListByUserId(long userId);
    List<UserResponse.Map> findBookmarkedMapList(List<MapBookmark> mapBookmarkList);
    List<UserResponse.Map> findMyMapList(List<Map> mapList);
    List<UserResponse.Map> findJoinMapList(List<Map> mapList);

}
