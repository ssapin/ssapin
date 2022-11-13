package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.repositorysupport.UserRankingRepositorySupport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserRankingServiceImpl implements UserRankingService{

    private final UserRankingRepositorySupport userRankingRepositorySupport;


    @Override
    @Transactional(readOnly = true)
    public List<UserResponse.UserRanking> findTopFiveByCampusId(long campusId) {
        return userRankingRepositorySupport.findUserRankingsByCampusId(campusId);
    }
}
