package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.repository.PlaceBookmarkRepository;
import com.ssapin.backend.api.domain.repositorysupport.PlaceBookmarkRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceBookmarkServiceImpl implements PlaceBookmarkService{

    PlaceBookmarkRepository placeBookmarkRepository;
    PlaceBookmarkRepositorySupport placeBookmarkRepositorySupport;

    @Override
    @Transactional(readOnly = true)
    public List<PlaceBookmark> findPlaceBookmarkByUserId(long userId) {
        return placeBookmarkRepositorySupport.findByUserId(userId);
    }
}
