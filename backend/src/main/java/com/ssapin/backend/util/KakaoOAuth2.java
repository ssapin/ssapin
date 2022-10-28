package com.ssapin.backend.util;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class KakaoOAuth2 {

    private final WebClient webClient;
    // properties 파일에 숨길 예정
    private static final String CLIENT_ID = "e3a714fa6facdc0a7b2fdc80c4cc85ef";
    // 테스트용
    private static final String REDIRECT_URI = "http://localhost:8080/auth/login";

    public String getKakaoToken(String authorizeCode) {

        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/kauth.kakao.com/oauth/token")
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("client_id", CLIENT_ID)
                        .queryParam("redirect_uri", REDIRECT_URI)
                        .queryParam("code", authorizeCode)
                        .build())
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block()
                .get("access_token")
                .toString();
    }

    public long getKakaoId(String accessToken) {

//        WebClient webClient = WebClient.builder()
//                .baseUrl("https://kapi.kakao.com")
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .build();
//
//        JSONObject response = webClient.get()
//                .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
//                .header("Authorization", "Bearer " + accessToken)
//                .retrieve().bodyToMono(JSONObject.class).block();
//
//        return Long.parseLong(response.get("id").toString());

        return Long.parseLong(
                webClient.get()
                        .uri(uriBuilder -> uriBuilder
                                .path("/kapi.kakao.com/v2/user/me")
                                .build())
                        .header("Authorization", "Bearer " + accessToken)
                        .retrieve()
                        .bodyToMono(JSONObject.class)
                        .block()
                        .get("id")
                        .toString());

    }
}
