package com.ssapin.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkRequest {

    private long itemId;

    public BookmarkRequest(long itemId) {
        this.itemId = itemId;
    }
}
