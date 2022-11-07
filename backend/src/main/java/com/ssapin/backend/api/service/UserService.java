package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    void addUser(long kakaoId);
    boolean hasUserByKakaoId(long kakaoId);
    User getUserByKakaoId(long kakaoId);
    User getUserById(long userId);
    UserResponse.Nickname countUserByNickname(String nickname);
    UserResponse.Detail getUserDetailByUserId(long userId);
    List<UserResponse.UserRanking> findUsersTopFiveByMapCnt(long campusId);
    void updateUserByUserId(long userId, UserRequest.Update request);
    Page<UserResponse.BookmarkedPlace> findBookmarkedPlaceList(long userId, Pageable pageable);
    Page<UserResponse.Map> findBookmarkedMapList(long userId, Pageable pageable);
    Page<UserResponse.Map> findMyMapList(long userId, Pageable pageable);
    Page<UserResponse.Map> findJoinMapList(long userId, Pageable pageable);
}
