package com.ssapin.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

public class InterceptorResponse {

    @Getter
    public static class Jwt {
        private String message;

        @Builder
        Jwt(String message){
            this.message = message;
        }
    }
}
