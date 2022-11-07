package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.Map;

import java.util.List;

public interface MapPlaceService {
    long getMapPlaceCntByUserId(long userId);
    long getMapPlaceCntByMapId(long mapId);
    long getParticipateCntByUserId(long userId);
    long getUserCntByMapId(long mapId);
    List<Map> getJoinMapListByUserId(long userId);

}
