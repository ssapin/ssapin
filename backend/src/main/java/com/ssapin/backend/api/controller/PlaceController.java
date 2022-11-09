package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.BookmarkRequest;
import com.ssapin.backend.api.domain.dto.request.PlaceMapRequest;
import com.ssapin.backend.api.domain.dto.response.PlaceInfoResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.PlaceServiceImpl;
import com.ssapin.backend.api.service.UserServiceImpl;
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

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);

        return new ResponseEntity<Long>(placeService.addPlaceInMap(user, placeRequest), HttpStatus.OK);
    }

    @PostMapping("/login/togethermap")
    @ApiOperation(value = "모여지도에 장소 추가/업데이트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> addPlaceInTogetherMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);

        return new ResponseEntity<Long>(placeService.addPlaceInTogetherMap(user, placeRequest), HttpStatus.OK);
    }


    @GetMapping(path = {"/ranking/{campusId}", "/ranking"})
    @ApiOperation(value = "장소 랭킹 리스트", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> getListPlaceRanking(@PathVariable(required = false) Long campusId) {

        PlaceMapResponse.RankingResponse result = placeService.getListPlaceRanking(campusId);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/login/map")
    @ApiOperation(value = "추천 지도에 장소 삭제", notes = "미리 생성된 추천지도에 장소 추가")
    public ResponseEntity<?> removePlaceInMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RemovePlaceInMapRequest removePlaceInMapRequest) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);
        Long result = placeService.removePlaceInMap(user, removePlaceInMapRequest);

        return new ResponseEntity<Long>(result, HttpStatus.OK);
    }

    @DeleteMapping("/login/togethermap")
    @ApiOperation(value = "모아지도에 장소 삭제", notes = "미리 생성된 모아지도에 장소 추가")
    public ResponseEntity<?> removePlaceInTogetherMap(@RequestHeader("accessToken") final String accessToken, @RequestBody PlaceMapRequest.RemovePlaceInTogethermapRequest removePlaceInTogethermapRequest) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);
        Long result = placeService.removePlaceInTogetherMap(user, removePlaceInTogethermapRequest);

        return new ResponseEntity<Long>(result, HttpStatus.OK);

    }

    @GetMapping("/{itemId}/detail")
    @ApiOperation(value = "장소 정보 조회", notes = "장소 정보 조회")
    public ResponseEntity<?> getPlaceInfo(@PathVariable long placeId, @RequestHeader(required = false, name = "accessToken") final String accessToken) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);


        PlaceInfoResponse result = placeService.getPlaceInfo(user,placeId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/map/{placeId}")
    @ApiOperation(value = "해당 장소가 추가된 추천지도 리스트 조회", notes = "해당 장소가 추가된 추천지도 리스트 조회")
    public ResponseEntity<?> getMapListInPlace(@PathVariable long placeId) {

        PlaceMapResponse.MapListResponse result = placeService.getMapListInPlace(placeId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/login/bookmark")
    @ApiOperation(value = "장소 북마크 등록", notes = "장소 북마크 등록")
    public ResponseEntity<?> registerBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody BookmarkRequest bookmarkRequest) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);
        Long result = placeService.registerBookmark(user, bookmarkRequest);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/login/bookmark")
    @ApiOperation(value = "장소 북마크 해제", notes = "장소 북마크 해제")
    public ResponseEntity<?> removeBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody BookmarkRequest bookmarkRequest) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);
        Long result = placeService.removeBookmark(user, bookmarkRequest);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
