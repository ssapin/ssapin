package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.User;

public interface UserService {
    void addUser(long kakaoId);
    boolean hasUserByKakaoId(long kakaoId);
    User getUserByKakaoId(long kakaoId);
    User getUserById(long userId);
}
