package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Review;

public class ReviewResponse {

    private int emojiType;
    private String content;
    private long userId;

    public ReviewResponse(Review review) {
        this.emojiType = review.getEmojiType();
        this.content = review.getContent();
        this.userId = review.getUser().getId();
    }
}
