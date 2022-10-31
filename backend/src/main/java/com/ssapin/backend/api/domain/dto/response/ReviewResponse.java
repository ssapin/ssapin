package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Review;
import lombok.Getter;

@Getter
public class ReviewResponse {

    private long reviewId;
    private int emojiType;
    private String content;
    private long userId;

    public ReviewResponse(Review review) {
        this.reviewId = review.getId();
        this.emojiType = review.getEmojiType();
        this.content = review.getContent();
        this.userId = review.getUser().getId();
    }
}
