package com.ssapin.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

public class AuthResponse {

    @Getter
    public static class Detail{
        private String accessToken;
        private String refreshToken;
        private boolean firstLogin;

        @Builder
        Detail(String accessToken, String refreshToken, boolean firstLogin){
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.firstLogin = firstLogin;
        }
    }

    @Getter
    public static class Login{
        private String accessToken;
        private boolean firstLogin;

        @Builder
        Login(String accessToken, boolean firstLogin){
            this.accessToken = accessToken;
            this.firstLogin = firstLogin;
        }

    }


    @Getter
    public static class Reissue{
        private String accessToken;

        @Builder
        Reissue(String accessToken){
            this.accessToken = accessToken;
        }

    }
}
