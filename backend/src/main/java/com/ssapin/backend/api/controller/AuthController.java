package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.AuthRequest;
import com.ssapin.backend.api.domain.dto.response.AuthResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.service.AuthService;
import com.ssapin.backend.util.CookieBuilder;
import com.ssapin.backend.util.KakaoOAuth2;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(value = "인증 API", tags={"Auth"})
@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final CookieBuilder cookieBuilder;

    private final static String SET_COOKIE = "Set-Cookie";
    @PostMapping("/login")
    @ApiOperation(value = "카카오 로그인/회원가입 ", notes = "JWT refresh token, access token 및 expiresIn을 반환")
    public ResponseEntity<?> login(@RequestBody AuthRequest.Login loginRequest, HttpServletResponse response) {

        AuthResponse.Detail detail = authService.login(loginRequest.getAuthorizeCode());
        response.setHeader(SET_COOKIE, cookieBuilder.createCookie(detail.getRefreshToken()).toString());

        return new ResponseEntity<>(AuthResponse.Login.builder()
                .accessToken(detail.getAccessToken())
                .firstLogin(detail.isFirstLogin())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/reissue")
    @ApiOperation(value = "엑세스 토큰 재발급", notes = "refresh Token, acces Token 필요, 새로운 access Token 발급")
    public ResponseEntity<?> reissue(@CookieValue("refreshToken") String refreshToken) {
        
        return new ResponseEntity<>(authService.reissueAccessToken(refreshToken), HttpStatus.OK);
    }
}
