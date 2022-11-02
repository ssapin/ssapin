package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.UserRepository;
import com.ssapin.backend.api.domain.repositorysupport.CampusRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.UserRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final UserRepositorySupport userRepositorySupport;
    private final CampusRepositorySupport campusRepositorySupport;
    @Override
    @Transactional
    public void addUser(long kakaoId) {

        Campus campus = campusRepositorySupport
            .findByCampusId(1)
            .orElseThrow(()-> new CustomException(ErrorCode.DATA_NOT_FOUND));

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
}
