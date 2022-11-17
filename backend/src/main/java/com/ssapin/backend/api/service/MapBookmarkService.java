package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.MapBookmark;

import java.util.List;

public interface MapBookmarkService {
    List<MapBookmark> getMapBookmarkListByUserId(long userId);
    long countByMapId(long mapId);
}
