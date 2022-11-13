package com.ssapin.backend.util;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class KakaoOAuth2 {

    @Value("${external.kakao.client-id}")
    private String CLIENT_ID;

    @Value("${external.jwt.secret-key}")
    String SECRET_KEY;

    @Value("${external.jwt.refresh-key}")
    String REFRESH_KEY;

    public String getRedirectURL(String requestURL) {

        if (requestURL.contains("localhost")) return "http://localhost:3000/auth/kakao/login";
        else return "https://k7a307.p.ssafy.io/auth/kakao/login";
    }

    public String getKakaoToken(String authorizeCode, String redirectURL) {

        WebClient webClient = WebClient.builder()
                .baseUrl("https://kauth.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth/token")
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("client_id", CLIENT_ID)
                        .queryParam("redirect_uri", redirectURL)
                        .queryParam("code", authorizeCode)
                        .build())
                .retrieve().bodyToMono(JSONObject.class).block();

        return response.get("access_token").toString();
    }

    public long getKakaoId(String accessToken) {

        WebClient webClient = WebClient.builder()
                .baseUrl("https://kapi.kakao.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
                .header("Authorization", "Bearer " + accessToken)
                .retrieve().bodyToMono(JSONObject.class).block();

        return Long.parseLong(response.get("id").toString());
    }
}
