package com.ssapin.backend.api.service;


import com.querydsl.core.BooleanBuilder;
import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewQueryResponse;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repository.ReviewRepository;
import com.ssapin.backend.api.domain.repository.UserRepository;
import com.ssapin.backend.api.domain.repositorysupport.ReviewRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssapin.backend.api.domain.entity.QUser.user;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final PlaceRepository placeRepository;

    private final ReviewRepository reviewRepository;
    private final ReviewRepositorySupport reviewRepositorySupport;

    private final UserRepository userRepository;


    @Override
    @Transactional
    public long addReview(ReviewRequest.ReviewAdd request, User user) {
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Optional<Review> reviews = reviewRepository.findByUserAndPlace(user, place);
        
        if(!reviews.isEmpty()) {
            Review review = reviews.get();
            reviewRepository.delete(review);
        }

        Review newReview = Review.builder()
                .place(place)
                .user(user)
                .emojiType(request.getEmojiType())
                .content(request.getContent())
                .build();
        return reviewRepository.save(newReview).getId();
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
        List<ReviewResponse> result = new ArrayList<>();
        List<Review> list = reviewRepositorySupport.findAllByPlace(place);
        for (Review r : list) {
            result.add(new ReviewResponse(r));
        }
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewQueryResponse> findReviewByBookmarkedPlace(List<PlaceBookmark> placeBookmarkList) {

        if (placeBookmarkList.size() == 0) return new ArrayList<>();

        BooleanBuilder builder = new BooleanBuilder();
        for (PlaceBookmark placeBookmark : placeBookmarkList)
            builder.or(QReview.review.place.id.eq(placeBookmark.getPlace().getId()));

        List<ReviewQueryResponse> ret = reviewRepositorySupport.findByBookmarkedPlace(builder);
        return reviewRepositorySupport.findByBookmarkedPlace(builder);
    }

}
