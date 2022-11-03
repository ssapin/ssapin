package com.ssapin.backend.util;

import lombok.Builder;
import lombok.Getter;

@Getter
public class KakaoBody {
    private String grant_type;
    private String client_id;
    private String redirect_uri;
    private String code;

    @Builder
    KakaoBody (String grant_type, String client_id, String redirect_uri, String code) {
        this.grant_type = grant_type;
        this.client_id = client_id;
        this.redirect_uri = redirect_uri;
        this.code = code;
    }
}
