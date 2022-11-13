package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.AuthResponse;
import com.ssapin.backend.api.domain.entity.Auth;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.AuthRepository;
import com.ssapin.backend.api.domain.repositorysupport.AuthRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final AuthRepositorySupport authRepositorySupport;
    private final AuthRepository authRepository;

    @Override
    public AuthResponse.Reissue createReissueResponse(String accessToken) {

        return AuthResponse.Reissue.builder()
                .accessToken(accessToken)
                .build();
    }

    @Override
    @Transactional
    public void addAuth(User user, String refreshToken) {

        Auth auth = Auth.builder()
                .user(user)
                .refreshToken(refreshToken)
                .build();

        authRepository.save(auth);
    }

    @Override
    @Transactional
    public void updateAuth(User user, String refreshToken) {
        Auth auth = authRepositorySupport
                .findByUserId(user.getId())
                .orElseThrow(()-> new CustomException(ErrorCode.DATA_NOT_FOUND));
        auth.update(refreshToken);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasAuthByRefreshToken(String refreshToken) {
        return authRepositorySupport.existByRefreshToken(refreshToken);
    }
}
