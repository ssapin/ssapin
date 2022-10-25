package com.ssapin.backend.api.service;


import com.ssapin.backend.api.domain.dto.request.ReviewRequestDto;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repository.ReviewRepository;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final PlaceRepository placeRepository;

    private final ReviewRepository reviewRepository;


    @Override
    @Transactional
    public void addReview(ReviewRequestDto.ReviewAdd request) {
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Review review = Review.builder()
                .emojiType(request.getEmojiType())
                .content(request.getContent())
                .build();
        reviewRepository.save(review);
    }
}
