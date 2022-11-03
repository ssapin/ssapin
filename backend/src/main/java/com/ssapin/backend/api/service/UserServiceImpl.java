package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.UserRepository;
import com.ssapin.backend.api.domain.repositorysupport.UserRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final CampusService campusService;

    private final PlaceBookmarkService placeBookmarkService;
    private final UserRepository userRepository;

    private final UserRepositorySupport userRepositorySupport;
    @Override
    @Transactional
    public void addUser(long kakaoId) {

        Campus campus = campusService.getCampusById(1);

        User user = User.builder()
                .nickname("undefined#"+kakaoId)
                .kakaoId(kakaoId)
                .campus(campus)
                .emoji("\uD83D\uDCA9")
                .build();

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse.Detail getUserDetailByUserId(long userId) {
        User user = getUserById(userId);

        return UserResponse.Detail.builder()
                .userId(user.getId())
                .campusId(user.getCampus().getId())
                .nickname(user.getNickname())
                .emoji(user.getEmoji())
                .build();
    }

    @Override
    @Transactional
    public void updateUserByUserId(long userId, UserRequest.Update request) {

        User user = getUserById(userId);
        String nickname = request.getNickname() != null ? request.getNickname() : user.getNickname();
        long campusId = request.getCampusId() != 0 ? request.getCampusId() : user.getCampus().getId();
        String emoji = request.getEmoji() != null ? request.getEmoji() : user.getEmoji();
        Campus campus = campusService.getCampusById(campusId);

        user.update(nickname, campus, emoji);
    }

    @Transactional(readOnly = true)
    public Page<UserResponse.BookmarkedPlace> findBookmarkedPlaceList(long userId, Pageable pageable) {

        List<PlaceBookmark> placeBookmarkList = placeBookmarkService.findPlaceBookmarkByUserId(userId);
        Review review = null;
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), placeBookmarkList.size());
        return null;
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
