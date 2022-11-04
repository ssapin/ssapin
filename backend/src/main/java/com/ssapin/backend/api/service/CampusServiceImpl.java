package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repositorysupport.CampusRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CampusServiceImpl implements CampusService{

    private final CampusRepository campusRepository;
    private final CampusRepositorySupport campusRepositorySupport;

    @Override
    @Transactional(readOnly = true)
    public Campus getCampusById(long campusId) {
        return campusRepositorySupport
                .findByCampusId(campusId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}
