package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.PlaceServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "장소 API", tags = {"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceServiceImpl placeService;

    @PostMapping("/map")
    @ApiOperation(value = "추천지도에 장소 추가 ", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> addPlaceInMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody PlaceRegisterRequest placeRegisterRequest) {


        try {  //   long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else
            {
                return new ResponseEntity<Long>(placeService.addPlaceInMap(user,placeRegisterRequest),HttpStatus.OK);
            }

        }catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 장소 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/togethermap")
    @ApiOperation(value = "모여지도에 장소 추가/업데이트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> addPlaceInTogetherMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody PlaceAPIRequest.TogetherMapRequest togetherMapRequest) {

        try {  //   long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else
            {
                return new ResponseEntity<Long>(placeService.addPlaceInTogetherMap(),HttpStatus.OK);
            }

        }catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<String>("모여지도 장소 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }


        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }


    @GetMapping("/ranking/{campusId}")
    @ApiOperation(value = "장소 랭킹 리스트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> getListPlaceRanking(@RequestHeader("ACCESS_TOKEN") final String accessToken,@PathVariable long campusId) {
        try {
            //   long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else
            {
                List<Place> result =placeService.getListPlaceRanking(user,campusId);

                return new ResponseEntity<Long>(placeService.getListPlaceRanking(),HttpStatus.OK);
            }

        }catch (Exception e)
        {
            e.printStackTrace();
            return new ResponseEntity<String>("모여지도 장소 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/map")
    @ApiOperation(value = "추천 지도에 장소 삭제", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> removePlaceInMap() {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

    @DeleteMapping("/together")
    @ApiOperation(value = "추천 지도에 장소 삭제", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> removePlaceInTogetherMap() {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

    @GetMapping("/{itemId}/detail")
    @ApiOperation(value = "장소 정보 조회", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> getPlaceInfo(@PathVariable long itemId) {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

    @GetMapping("/map/{itemId}")
    @ApiOperation(value = "해당 장소가 추가된 추천지도 리스트 조회", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> getMapListInPlace(@PathVariable long itemId) {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

    @PostMapping("/bookmark")
    @ApiOperation(value = "장소 북마크", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> registerBookmark() {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

    @DeleteMapping("/bookmark")
    @ApiOperation(value = "장소 북마크 해제", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> removeBookmark() {

        return null;
        // return new ResponseEntity<List<ReviewResponse>>(reviewService.findReview(placeId), HttpStatus.OK);
    }

}
