package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.BookmarkRequest;
import com.ssapin.backend.api.domain.dto.request.PlaceMapRequest;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.PlaceServiceImpl;
import com.ssapin.backend.api.service.UserServiceImpl;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "장소 API", tags = {"Place"})
@RestController
@CrossOrigin("*")
@RequestMapping("/place")
@RequiredArgsConstructor
public class PlaceController {

    private final PlaceServiceImpl placeService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserServiceImpl userService;

    @PostMapping("/login/map")
    @ApiOperation(value = "추천지도에 장소 추가 ", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> addPlaceInMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {


        try {

            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);
            //User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(placeService.addPlaceInMap(user, placeRequest), HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 장소 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/togethermap")
    @ApiOperation(value = "모여지도에 장소 추가/업데이트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> addPlaceInTogetherMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);
            // User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(placeService.addPlaceInTogetherMap(user, placeRequest), HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("모여지도 장소 추가 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping(path = {"/ranking/{campusId}", "/ranking"})
    @ApiOperation(value = "장소 랭킹 리스트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> getListPlaceRanking(@PathVariable(required = false) Long campusId) {

        PlaceMapResponse.RankingResponse result = null;

        try {

            result = placeService.getListPlaceRanking(campusId);

        } catch (CustomException ce) {
            ce.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("장소 랭킹 리스트 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/login/map")
    @ApiOperation(value = "추천 지도에 장소 삭제", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> removePlaceInMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RemovePlaceInMapRequest removePlaceInMapRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);

            //   User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                Long result = placeService.removePlaceInMap(user, removePlaceInMapRequest);

                return new ResponseEntity<Long>(result, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천 지도에 장소 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/login/togethermap")
    @ApiOperation(value = "모아지도에 장소 삭제", notes = "미리 생성된 모아지도에 장소 추가")
    public ResponseEntity<?> removePlaceInTogetherMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RemovePlaceInTogethermapRequest removePlaceInTogethermapRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);

            // User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                Long result = placeService.removePlaceInTogetherMap(user, removePlaceInTogethermapRequest);

                return new ResponseEntity<Long>(result, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("모아지도 장소 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{placeId}/detail")
    @ApiOperation(value = "장소 정보 조회", notes = "장소 정보 조회")
    public ResponseEntity<?> getPlaceInfo(@PathVariable long placeId) {

        try {

//            User user = new User("test", 1L, new Campus("test"), "test");


            PlaceResponse result = placeService.getPlaceInfo(placeId);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("장소 정보 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/map/{placeId}")
    @ApiOperation(value = "해당 장소가 추가된 추천지도 리스트 조회", notes = "해당 장소가 추가된 추천지도 리스트 조회")
    public ResponseEntity<?> getMapListInPlace(@PathVariable long placeId) {

        try {


            PlaceMapResponse.MapListResponse result = placeService.getMapListInPlace(placeId);

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("해당 장소가 추가된 추천지도 리스트 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/bookmark")
    @ApiOperation(value = "장소 북마크 등록", notes = "장소 북마크 등록")
    public ResponseEntity<?> registerBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody BookmarkRequest bookmarkRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);

            //    User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                Long result = placeService.registerBookmark(user, bookmarkRequest);

                return new ResponseEntity<>(result, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("장소 북마크 등록 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/login/bookmark")
    @ApiOperation(value = "장소 북마크 해제", notes = "장소 북마크 해제")
    public ResponseEntity<?> removeBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody BookmarkRequest bookmarkRequest) {

        try {
            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            User user = userService.getUserById(userId);

//            User user = new User("test", 1L, new Campus("test"), "test");


            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                Long result = placeService.removeBookmark(user, bookmarkRequest);

                return new ResponseEntity<>(result, HttpStatus.OK);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("장소 북마크 해제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
