package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.UserResponse;

import java.util.List;

public interface UserRankingService {

    List<UserResponse.UserRanking> findTopFiveByCampusId(long campusId);
}
