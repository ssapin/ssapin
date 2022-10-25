package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.ReviewRequest;

public interface ReviewService {
public long addReview(ReviewRequest.ReviewAdd request);
public long updateReview(ReviewRequest.ReviewEdit request);
}
