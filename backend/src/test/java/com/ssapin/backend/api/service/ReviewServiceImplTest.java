package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repository.ReviewRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private PlaceRepository placeRepository;


    @DisplayName("리뷰달기 생성 테스트")
    @Test
    void addReview() {
        //given
        Place testplace = Place.builder()
                .title("test place title")
                .lng(1)
                .lat(1)
                .itemId(1)
                .build();

        Review testreview = Review.builder()
                .place(testplace)
                .emojiType(1)
                .content("존맛탱구리구리뱅뱅")
                .build();

        Long fakeReviewId = 1l;
        ReflectionTestUtils.setField(testreview, "id", fakeReviewId);


        ReviewRequest.ReviewAdd reviewRequest = new ReviewRequest.ReviewAdd(
                testplace.getId(), testreview.getEmojiType(), testreview.getContent()
        );

        //mocking
        given(placeRepository.findById(any())).willReturn(Optional.ofNullable(testplace));
        given(reviewRepository.save(any())).willReturn(testreview);
        given(reviewRepository.findById(fakeReviewId)).willReturn(Optional.ofNullable(testreview));

        //when

        long newReviewId = reviewService.addReview(reviewRequest);
        System.out.println(newReviewId);
        //then
        Review review = reviewRepository.findById(newReviewId).get();
        assertEquals(testreview.getId(), review.getId());
        assertEquals(testreview.getEmojiType(), review.getEmojiType());
        assertEquals(testreview.getContent(), review.getContent());
    }

    @DisplayName("리뷰 수정 테스트")
    @Test
    void updateReview() {
        //given
        addReview();
        Review testreview = reviewRepository.findById(1L).get();

        ReviewRequest.ReviewEdit reviewEdit = new ReviewRequest.ReviewEdit(
                testreview.getId(), 2, "어쩔"
        );

        //when
        long updatedreviewId = reviewService.updateReview(reviewEdit);
        //then
        assertEquals(reviewRepository.findById(updatedreviewId).get().getEmojiType(), 2);
        assertEquals(reviewRepository.findById(updatedreviewId).get().getContent(), "어쩔");
    }

    @DisplayName("리뷰 삭제 테스트")
    @Test
    void deleteReview() {
        //given
        addReview();
        Review testreview = reviewRepository.findById(1L).get();
        willDoNothing().given(reviewRepository).delete(testreview);
        //when
        reviewService.deleteReview(1L);
        //then
        verify(reviewRepository, times(1)).delete(testreview);
    }

}