package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.AuthResponse;
import com.ssapin.backend.api.domain.entity.Auth;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.AuthRepository;
import com.ssapin.backend.api.domain.repositorysupport.AuthRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import com.ssapin.backend.util.JwtTokenUtil;
import com.ssapin.backend.util.KakaoOAuth2;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final JwtTokenUtil jwtTokenUtil;
    private final KakaoOAuth2 kakaoOAuth2;
    private final UserService userService;
    private final AuthRepositorySupport authRepositorySupport;
    private final AuthRepository authRepository;

    @Override
    public AuthResponse.Detail login(String authorizeCode) {

        boolean firstLogin = false;
        String kakaoToken = kakaoOAuth2.getKakaoToken(authorizeCode);
        long kakaoId = kakaoOAuth2.getKakaoId(kakaoToken);

        if (!userService.hasUserByKakaoId(kakaoId)) {
            userService.addUser(kakaoId);
            firstLogin = true;
        }

        User user = userService.getUserByKakaoId(kakaoId);

        String refreshToken = jwtTokenUtil.saveRefreshToken(user);
        String accessToken = jwtTokenUtil.generateJwtToken(user);

        addAuth(user, refreshToken);

        return AuthResponse.Detail.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .firstLogin(firstLogin)
                .build();
    }

    @Override
    public AuthResponse.Reissue reissueAccessToken(String refreshToken) {

        if (refreshToken == null
                || !jwtTokenUtil.isValidRefreshToken(refreshToken)
                || !authRepositorySupport.existByRefreshToken(refreshToken))
            throw new CustomException(ErrorCode.AUTHENTICATION_FAILED);

        long userId = jwtTokenUtil.getUserIdFromRefreshToken(refreshToken);
        User user = userService.getUserById(userId);
        String accessToken = jwtTokenUtil.generateJwtToken(user);

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
    @Transactional(readOnly = true)
    public boolean hasAuthByRefreshToken(String refreshToken) {
        return authRepositorySupport.existByRefreshToken(refreshToken);
    }
}
