package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    void addUser(long kakaoId);
    boolean hasUserByKakaoId(long kakaoId);
    User getUserByKakaoId(long kakaoId);
    User getUserById(long userId);
    UserResponse.Nickname countUserByNickname(String nickname);
    UserResponse.Detail getUserDetailByUserId(long userId);
    void updateUserByUserId(long userId, UserRequest.Update request);
    Page<UserResponse.BookmarkedPlace> findBookmarkedPlaceList(long userId, Pageable pageable);
}
