package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.ReviewQueryResponse;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.service.*;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import com.ssapin.backend.util.EmojiChecker;
import com.ssapin.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;


@Api(value = "유저 API", tags={"User"})
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    private final CampusService campusService;
    private final PlaceBookmarkService placeBookmarkService;
    private final MapService mapService;
    private final TogethermapPlaceService togethermapPlaceService;
    private final MapPlaceService mapPlaceService;
    private final MapBookmarkService mapBookmarkService;
    private final UserRankingService userRankingService;
    private final ReviewService reviewService;

    private final EmojiChecker emojiChecker;

    @GetMapping("/check/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "사용중일 경우 true 그렇지 않으면 false")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        return new ResponseEntity<>(userService.countUserByNickname(nickname), HttpStatus.OK);
    }

    @GetMapping("/login/info")
    @ApiOperation(value = "내 정보 조회", notes = "엑세스토큰의 userId에 해당하는 유저정보를 조회")
    public ResponseEntity<?> getUser(@RequestHeader("accessToken") String accessToken) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(jwtTokenUtil.getUserIdFromToken(accessToken));

        UserResponse.Detail detail = userService.getUserDetail(
                user,
                mapService.getMapCntByUserId(userId),
                togethermapPlaceService.getTogethermapPlaceCntByUserId(userId)
                        + mapPlaceService.getMapPlaceCntByUserId(userId),
                mapPlaceService.getParticipateCntByUserId(userId)
                        + togethermapPlaceService.getParticipateCntByUserId(userId)
        );

        return new ResponseEntity<>(detail,HttpStatus.OK);
    }

    @PatchMapping("/login/info")
    @ApiOperation(value = "내 정보 수정", notes = "엑세스토큰의 userId에 해당하는 유저정보를 수정")
    public ResponseEntity<?> modifyUser(@RequestHeader("accessToken") String accessToken,
                                        @RequestBody UserRequest.Update request) {

        if (!emojiChecker.isUserEmoji(request.getEmoji()))
            throw new CustomException(ErrorCode.USER_NOT_EMOJI);

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        User user = userService.getUserById(userId);
        long campusId = request.getCampusId() != 0 ? request.getCampusId() : user.getCampus().getId();
        Campus campus = campusService.getCampusById(campusId);

        userService.updateUser(
                userService.getUserById(userId),
                campus,
                request
        );

        return new ResponseEntity<>("회원정보 수정 성공",HttpStatus.OK);
    }
    @GetMapping("/login/place/bookmark")
    @ApiOperation(value = "장소 북마크 리스트", notes = "사용자가 북마크한 장소 목록 조회")
    public ResponseEntity<?> getBookmarkedPlace(@RequestHeader("accessToken") final String accessToken,
                                        @PageableDefault(size=6) Pageable pageable) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        List<PlaceBookmark> placeBookmarkList = placeBookmarkService.findPlaceBookmarkByUserId(userId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), placeBookmarkList.size());
        List<PlaceBookmark> placeBookmarkSubList = placeBookmarkList.subList(start, end);
        List<ReviewQueryResponse> reviewList = reviewService.findReviewByBookmarkedPlace(placeBookmarkSubList);

        List<UserResponse.BookmarkedPlace> bookmarkedPlaceList = userService.findBookmarkedPlaceList(
                placeBookmarkSubList,
                reviewList
        );
        return new ResponseEntity<>(
                new PageImpl<>(bookmarkedPlaceList, pageable, placeBookmarkList.size()), HttpStatus.OK);
    }

    @GetMapping("/login/map/bookmark")
    @ApiOperation(value = "추천지도 북마크 리스트", notes = "사용자가 북마크한 추천지도 목록 조회")
    public ResponseEntity<?> getBookmarkedMaps(@RequestHeader("accessToken") final String accessToken,
                                                @PageableDefault(size=6) Pageable pageable) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        List<MapBookmark> mapBookmarkList = mapBookmarkService.getMapBookmarkListByUserId(userId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), mapBookmarkList.size());
        List<MapBookmark> mapBookmarkSubList = mapBookmarkList.subList(start, end);
        List<UserResponse.Map> bookmarkedMapList = mapPlaceService.findBookmarkedMapList(mapBookmarkSubList);

        return new ResponseEntity<>(
                new PageImpl<>(bookmarkedMapList, pageable, mapBookmarkList.size()), HttpStatus.OK
        );
    }

    @GetMapping("/login/map/mine")
    @ApiOperation(value = "작성한 추천지도 리스트", notes = "사용자가 생성한 추천지도 목록 조회")
    public ResponseEntity<?> getMyMaps(@RequestHeader("accessToken") final String accessToken,
                                               @PageableDefault(size=6) Pageable pageable) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        List<com.ssapin.backend.api.domain.entity.Map> mapList = mapService.getMapListByUserId(userId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), mapList.size());
        List<com.ssapin.backend.api.domain.entity.Map> mapSubList = mapList.subList(start, end);
        List<UserResponse.Map> myMapList = mapPlaceService.findMyMapList(mapSubList);

        return new ResponseEntity<>(
                new PageImpl<>(myMapList, pageable, mapList.size()), HttpStatus.OK
        );
    }

    @GetMapping("/login/map/join")
    @ApiOperation(value = "참가한 추천지도 리스트", notes = "사용자가 참가한 추천지도 목록 조회")
    public ResponseEntity<?> getJoinMaps(@RequestHeader("accessToken") final String accessToken,
                                       @PageableDefault(size=6) Pageable pageable) {

        long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
        List<Map> mapList = mapPlaceService.getJoinMapListByUserId(userId);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), mapList.size());
        List<Map> mapSubList = mapList.subList(start, end);
        List<UserResponse.Map> joinMapList = mapPlaceService.findJoinMapList(mapSubList);

        return new ResponseEntity<>(
                new PageImpl<>(joinMapList, pageable, mapList.size()), HttpStatus.OK
        );
    }


    @GetMapping("/ranking/{campusId}")
    @ApiOperation(value = "유저랭킹 리스트", notes = "사용자의 캠퍼스ID를 기준으로 TOP5 유저를 조회")
    public ResponseEntity<?> getUserRankingList(@PathVariable long campusId) {

        List<UserResponse.UserRanking> userRankingList = userRankingService.findTopFiveByCampusId(campusId);

        java.util.Map<String, List<UserResponse.UserRanking>> responseMap = new HashMap<>();
        responseMap.put("userRankingList",userRankingList);
        return new ResponseEntity<>(
                responseMap
                , HttpStatus.OK);
    }
}
