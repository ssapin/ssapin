package com.ssapin.backend.api.domain.dto.request;

import lombok.Getter;

public class UserRequest {

    @Getter
    public static class Update {
        private String nickname;
        private long campusId;
        private String emoji;
    }
}
