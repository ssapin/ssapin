package com.ssapin.backend.api.service;


import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repository.ReviewRepository;
import com.ssapin.backend.api.domain.repositorysupport.ReviewRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final PlaceRepository placeRepository;

    private final ReviewRepository reviewRepository;
    private final ReviewRepositorySupport reviewRepositorySupport;


    @Override
    @Transactional
    public long addReview(ReviewRequest.ReviewAdd request) {
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Review review = Review.builder()
                .place(place)
                .emojiType(request.getEmojiType())
                .content(request.getContent())
                .build();
        return reviewRepository.save(review).getId();
    }

    @Override
    @Transactional
    public long updateReview(ReviewRequest.ReviewEdit request) {
        Review review = reviewRepository.findById(request.getReviewId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return review.update(request.getEmojiType(), request.getContent()).getId();
    }

    @Override
    @Transactional
    public void deleteReview(long reviewId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        reviewRepository.delete(review);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> findReview(long placeId) {
        Place place = placeRepository.findById(placeId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        return reviewRepositorySupport.findAllByPlace(place);
    }

}
