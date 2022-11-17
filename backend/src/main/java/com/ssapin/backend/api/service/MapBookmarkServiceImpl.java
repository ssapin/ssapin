package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.MapBookmark;
import com.ssapin.backend.api.domain.repositorysupport.MapBookmarkRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MapBookmarkServiceImpl implements MapBookmarkService{

    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;

    @Override
    @Transactional(readOnly = true)
    public List<MapBookmark> getMapBookmarkListByUserId(long userId) {
        return mapBookmarkRepositorySupport.findByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public long countByMapId(long mapId) {
        return mapBookmarkRepositorySupport.countMapBookmarkByMapId(mapId);
    }
}
