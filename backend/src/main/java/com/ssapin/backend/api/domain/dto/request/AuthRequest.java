package com.ssapin.backend.api.domain.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@ApiModel("AuthRequest")
public class AuthRequest {
    @Getter
    public static class Login {
        private String authorizeCode;
    }
}
