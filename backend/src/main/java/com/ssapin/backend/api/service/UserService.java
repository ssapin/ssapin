package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewQueryResponse;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    void addUser(long kakaoId, Campus campus);
    boolean hasUserByKakaoId(long kakaoId);
    User getUserByKakaoId(long kakaoId);
    User getUserById(long userId);
    UserResponse.Nickname countUserByNickname(String nickname);
    UserResponse.Detail getUserDetail(User user, long mapCnt, long placeCnt, long participateCnt);
    void updateUser(User user, Campus campus, UserRequest.Update request);
    List<UserResponse.BookmarkedPlace> findBookmarkedPlaceList(List<PlaceBookmark> placeBookmarkList, List<ReviewQueryResponse> reviewList);
}
