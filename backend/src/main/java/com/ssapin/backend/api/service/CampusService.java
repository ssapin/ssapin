package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.Campus;

public interface CampusService {
    Campus getCampusById(long campusId);
}
