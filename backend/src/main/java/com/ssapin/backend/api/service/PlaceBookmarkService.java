package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.PlaceBookmark;

import java.util.List;

public interface PlaceBookmarkService {
    List<PlaceBookmark> findPlaceBookmarkByUserId(long userId);
}
