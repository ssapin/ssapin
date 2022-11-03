package com.ssapin.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

public class InterceptorResponse {

    @Getter
    public static class Jwt {
        private String accessToken;
        private String message;

        @Builder
        Jwt(String accessToken, String message){
            this.accessToken = accessToken;
            this.message = message;
        }
    }
}
