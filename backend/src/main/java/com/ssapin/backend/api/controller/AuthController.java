package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.AuthRequest;
import com.ssapin.backend.api.domain.dto.response.AuthResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.AuthService;
import com.ssapin.backend.api.service.CampusService;
import com.ssapin.backend.api.service.UserService;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import com.ssapin.backend.util.CookieBuilder;
import com.ssapin.backend.util.JwtTokenUtil;
import com.ssapin.backend.util.KakaoOAuth2;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Api(value = "인증 API", tags={"Auth"})
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    private final CampusService campusService;
    private final CookieBuilder cookieBuilder;
    private final JwtTokenUtil jwtTokenUtil;

    private final KakaoOAuth2 kakaoOAuth2;

    private static final String SET_COOKIE = "Set-Cookie";
    @PostMapping("/login")
    @ApiOperation(value = "카카오 로그인/회원가입 ", notes = "JWT refresh token, access token 및 expiresIn을 반환")
    public ResponseEntity<?> login(@RequestBody AuthRequest.Login loginRequest, HttpServletResponse response,
                                   HttpServletRequest request) {

        String redirectURL = kakaoOAuth2.getRedirectURL(request.getRemoteAddr());
        boolean firstLogin = false;
        String kakaoToken = kakaoOAuth2.getKakaoToken(loginRequest.getAuthorizeCode(), redirectURL);
        long kakaoId = kakaoOAuth2.getKakaoId(kakaoToken);


        if (!userService.hasUserByKakaoId(kakaoId)) {

            Campus campus = campusService.getCampusById(1);
            userService.addUser(kakaoId, campus);
            firstLogin = true;
        }

        User user = userService.getUserByKakaoId(kakaoId);
        String refreshToken = jwtTokenUtil.saveRefreshToken(user);
        String accessToken = jwtTokenUtil.generateJwtToken(user);

        if (firstLogin) authService.addAuth(user, refreshToken);
        else authService.updateAuth(user, refreshToken);
        response.setHeader(SET_COOKIE, cookieBuilder.createCookie(refreshToken).toString());

        return new ResponseEntity<>(AuthResponse.Login.builder()
                .accessToken(accessToken)
                .firstLogin(firstLogin)
                .build(), HttpStatus.OK);
    }

    @GetMapping("/reissue")
    @ApiOperation(value = "엑세스 토큰 재발급", notes = "refresh Token, acces Token 필요, 새로운 access Token 발급")
    public ResponseEntity<?> reissue(@CookieValue("refreshToken") String refreshToken) {

        if (refreshToken == null
                || !jwtTokenUtil.isValidRefreshToken(refreshToken)
                || !authService.hasAuthByRefreshToken(refreshToken))
            throw new CustomException(ErrorCode.AUTHENTICATION_FAILED);

        long userId = jwtTokenUtil.getUserIdFromRefreshToken(refreshToken);
        User user = userService.getUserById(userId);
        String accessToken = jwtTokenUtil.generateJwtToken(user);

        return new ResponseEntity<>(authService.createReissueResponse(accessToken), HttpStatus.OK);
    }
}
