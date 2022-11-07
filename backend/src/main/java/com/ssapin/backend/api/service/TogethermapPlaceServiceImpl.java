package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.repositorysupport.TogethermapPlaceRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TogethermapPlaceServiceImpl implements TogethermapPlaceService{

    private final TogethermapPlaceRepositorySupport togethermapPlaceRepositorySupport;

    @Override
    @Transactional(readOnly = true)
    public long getTogethermapPlaceCntByUserId(long userId) {
        return togethermapPlaceRepositorySupport.countTogethermapPlaceByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public long getParticipateCntByUserId(long userId) {
        return togethermapPlaceRepositorySupport.countParticipationByUserId(userId);
    }
}
