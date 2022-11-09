package com.ssapin.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkRequest {

    private long placeId;

    public BookmarkRequest(long placeId) {
        this.placeId = placeId;
    }
}
