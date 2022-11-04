package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.entity.User;

import java.util.List;

public interface ReviewService {
    long addReview(ReviewRequest.ReviewAdd request , User user);
    long updateReview(ReviewRequest.ReviewEdit request);
    void deleteReview(long reviewId);
    List<Review> findReviewByBookmarkedPlace(List<PlaceBookmark> placeBookmarkList);
    List<ReviewResponse> findReview(long placeId);
}
