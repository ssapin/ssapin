package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewQueryResponse;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.UserRepository;
import com.ssapin.backend.api.domain.repositorysupport.UserRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserRepositorySupport userRepositorySupport;

    @Override
    @Transactional
    public void addUser(long kakaoId, Campus campus) {

        User user = User.builder()
                .nickname("싸핀러#"+kakaoId)
                .kakaoId(kakaoId)
                .campus(campus)
                .emoji("\uD83D\uDCA9")
                .build();

        userRepository.save(user);
    }

    @Override
    public UserResponse.Detail getUserDetail(User user, long mapCnt, long placeCnt, long participateCnt) {

        return UserResponse.Detail.builder()
                .userId(user.getId())
                .campusId(user.getCampus().getId())
                .nickname(user.getNickname())
                .emoji(user.getEmoji())
                .mapCnt(mapCnt)
                .placeCnt(placeCnt)
                .participateCnt(participateCnt)
                .build();
    }

    @Override
    @Transactional
    public void updateUser(User user, Campus campus, UserRequest.Update request) {

        String nickname = request.getNickname() != null ? request.getNickname() : user.getNickname();
        String emoji = request.getEmoji() != null ? request.getEmoji() : user.getEmoji();
        user.update(nickname, campus, emoji);
    }

    @Override
    public List<UserResponse.BookmarkedPlace> findBookmarkedPlaceList(
                                                                      List<PlaceBookmark> placeBookmarkList,
                                                                      List<ReviewQueryResponse> reviewList) {

        List<UserResponse.BookmarkedPlace> bookmarkedPlaceList = new ArrayList<>();

        for (PlaceBookmark placeBookmark : placeBookmarkList) {
            Place place = placeBookmark.getPlace();
            String content = null;

            for (ReviewQueryResponse review : reviewList) {
                if (review.getPlaceId() == place.getId()) {
                    content = review.getContent();
                    break;
                }
            }

            UserResponse.BookmarkedPlace bookmarkedPlace = UserResponse.BookmarkedPlace.builder()
                    .placeId(place.getId())
                    .itemId(place.getItemId())
                    .title(place.getTitle())
                    .address(place.getAddress())
                    .content(content)
                    .build();
            bookmarkedPlaceList.add(bookmarkedPlace);
        }

        return bookmarkedPlaceList;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasUserByKakaoId(long kakaoId) {

        return userRepositorySupport.existByKakaoId(kakaoId);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByKakaoId(long kakaoId) {
        return userRepositorySupport
                .findByKakaoId(kakaoId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(long userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse.Nickname countUserByNickname(String nickname) {
        boolean using = userRepositorySupport.existByNickname(nickname);
        return UserResponse.Nickname.builder()
                .using(using)
                .build();
    }
}
