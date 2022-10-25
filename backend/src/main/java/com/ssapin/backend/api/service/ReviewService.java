package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.ReviewRequestDto;

public interface ReviewService {
public void addReview(ReviewRequestDto.ReviewAdd request);
}
