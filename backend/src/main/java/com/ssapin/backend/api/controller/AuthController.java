package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.AuthRequest;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.service.AuthService;
import com.ssapin.backend.util.KakaoOAuth2;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "인증 API", tags={"Auth"})
@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final KakaoOAuth2 kakaoOAuth2;
    @PostMapping("/login")
    @ApiOperation(value = "카카오 로그인/회원가입 ", notes = "JWT refresh token, access token 및 expiresIn을 반환")
    public ResponseEntity<?> login(@RequestBody AuthRequest.Login loginRequest) {

        return null;
    }

    @GetMapping("/test/{accessToken}")
    public ResponseEntity<?> testApi(@PathVariable String accessToken){
        long id = kakaoOAuth2.getKakaoId(accessToken);

        return new ResponseEntity<>("sibal" + id, HttpStatus.OK);
    }

}
