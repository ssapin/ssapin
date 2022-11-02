package com.ssapin.backend.api.controller;


import com.ssapin.backend.api.domain.dto.request.ReviewRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.ReviewServiceImpl;
import com.ssapin.backend.api.service.UserServiceImpl;
import com.ssapin.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "리뷰 관련 API", tags = {"Review"})
@RestController
@CrossOrigin("*")
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewServiceImpl reviewService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserServiceImpl userService;

    @GetMapping("/{placeId}")
    @ApiOperation(value = "리뷰 리스트 조회 ", notes = "장소에 따른 리뷰리스트 조회한다")
    public ResponseEntity<?> getReviewList(@PathVariable long placeId) {
        return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }


    @PostMapping("/login")
    @ApiOperation(value = "리뷰 생성 ", notes = "리뷰 작성하기")
    public ResponseEntity<?> addReview(@RequestHeader("accessToken") final String accessToken, @RequestBody ReviewRequest.ReviewAdd reviewRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {

                reviewService.addReview(reviewRequest, user);
                return new ResponseEntity<String>("리뷰 생성 성공!", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("리뷰 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PatchMapping("/login")
    @ApiOperation(value = "리뷰 수정", notes = "리뷰를 수정한다.")
    public ResponseEntity<?> updateReview(@RequestHeader("accessToken") final String accessToken, @RequestBody ReviewRequest.ReviewEdit reviewEdit) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                long updatedReviewId = reviewService.updateReview(reviewEdit);
                return new ResponseEntity<String>("리뷰 수정 성공!", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("리뷰 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }


    @DeleteMapping("/login")
    @ApiOperation(value = "리뷰 삭제", notes = "내가 적은 리뷰 삭제")
    public ResponseEntity<?> deleteReview(@RequestHeader("accessToken") final String accessToken, @RequestBody final Map<String, Long> request) {
        long reviewId = request.get("reviewId");
        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                reviewService.deleteReview(reviewId);
                return new ResponseEntity<String>("리뷰 삭제 성공!", HttpStatus.NO_CONTENT);

            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("리뷰 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
