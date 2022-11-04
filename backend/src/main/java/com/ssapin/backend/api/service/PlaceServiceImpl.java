package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements  PlaceService{

    private final PlaceRepository placeRepository;

    @Override
    @Transactional
    public long countPlaceByUserId(long userId) {

        return 1;
    }
}
