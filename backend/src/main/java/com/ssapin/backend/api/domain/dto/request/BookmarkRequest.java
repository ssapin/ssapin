package com.ssapin.backend.api.domain.dto.request;

import lombok.Getter;

@Getter
public class BookmarkRequest {

    private long itemId;

    public BookmarkRequest(long itemId) {
        this.itemId = itemId;
    }
}
