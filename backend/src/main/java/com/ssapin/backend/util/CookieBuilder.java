package com.ssapin.backend.util;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieBuilder {
    private final static int MAX_AGE = 7 * 24 * 60 * 60;

    public ResponseCookie createCookie(String refreshToken) {

        return ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(MAX_AGE)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
    }
}
