package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;

import java.util.List;

public interface TogethermapService {
    List<TogethermapResponse> findAll(long campusId);

    TogethermapResponse findOne(long togethermapId);
}
