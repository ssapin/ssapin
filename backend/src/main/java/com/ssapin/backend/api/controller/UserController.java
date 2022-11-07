package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.UserRequest;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.service.UserService;
import com.ssapin.backend.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Api(value = "유저 API", tags={"User"})
@RestController
@CrossOrigin("*")
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;

    @GetMapping("/check/{nickname}")
    @ApiOperation(value = "닉네임 중복 검사", notes = "사용중일 경우 true 그렇지 않으면 false")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        return new ResponseEntity<>(userService.countUserByNickname(nickname), HttpStatus.OK);
    }

    @GetMapping("/login/info")
    @ApiOperation(value = "내 정보 조회", notes = "엑세스토큰의 userId에 해당하는 유저정보를 조회")
    public ResponseEntity<?> getUser(@RequestHeader("accessToken") String accessToken) {
        return new ResponseEntity<>(
                userService.getUserDetailByUserId(jwtTokenUtil.getUserIdFromToken(accessToken))
                ,HttpStatus.OK
        );
    }

    @PatchMapping("/login/info")
    @ApiOperation(value = "내 정보 수정", notes = "엑세스토큰의 userId에 해당하는 유저정보를 수정")
    public ResponseEntity<?> modifyUser(@RequestHeader("accessToken") String accessToken,
                                        @RequestBody UserRequest.Update request) {
        userService.updateUserByUserId(jwtTokenUtil.getUserIdFromToken(accessToken), request);
        return new ResponseEntity<>("회원정보 수정 성공",HttpStatus.OK);
    }

    @GetMapping("/login/place/bookmark")
    @ApiOperation(value = "장소 북마크 리스트", notes = "사용자가 북마크한 장소 목록 조회")
    public ResponseEntity<?> getBookmarkedPlace(@RequestHeader("accessToken") final String accessToken,
                                        @PageableDefault(size=6) Pageable pageable) {
        return new ResponseEntity<>(
                userService.findBookmarkedPlaceList(
                        jwtTokenUtil.getUserIdFromToken(accessToken),
                        pageable),
                HttpStatus.OK);
    }

    @GetMapping("/login/map/bookmark")
    @ApiOperation(value = "추천지도 북마크 리스트", notes = "사용자가 북마크한 추천지도 목록 조회")
    public ResponseEntity<?> getBookmarkedMaps(@RequestHeader("accessToken") final String accessToken,
                                                @PageableDefault(size=6) Pageable pageable) {
        return new ResponseEntity<>(
                userService.findBookmarkedMapList(
                        jwtTokenUtil.getUserIdFromToken(accessToken),
                        pageable),
                HttpStatus.OK);
    }

    @GetMapping("/login/map/mine")
    @ApiOperation(value = "작성한 추천지도 리스트", notes = "사용자가 생성한 추천지도 목록 조회")
    public ResponseEntity<?> getMyMaps(@RequestHeader("accessToken") final String accessToken,
                                               @PageableDefault(size=6) Pageable pageable) {
        return new ResponseEntity<>(
                userService.findMyMapList(
                        jwtTokenUtil.getUserIdFromToken(accessToken),
                        pageable),
                HttpStatus.OK);
    }

    @GetMapping("/login/map/join")
    @ApiOperation(value = "참가한 추천지도 리스트", notes = "사용자가 참가한 추천지도 목록 조회")
    public ResponseEntity<?> getJoinMaps(@RequestHeader("accessToken") final String accessToken,
                                       @PageableDefault(size=6) Pageable pageable) {
        return new ResponseEntity<>(
                userService.findJoinMapList(
                        jwtTokenUtil.getUserIdFromToken(accessToken),
                        pageable),
                HttpStatus.OK);
    }


    @GetMapping("/ranking/{campusId}")
    @ApiOperation(value = "유저랭킹 리스트", notes = "사용자의 캠퍼스ID를 기준으로 TOP5 유저를 조회")
    public ResponseEntity<?> getUserRankingList(@PathVariable long campusId) {

        Map<String, List<UserResponse.UserRanking>> responseMap = new HashMap<>();
        responseMap.put("userRankingList", userService.findUsersTopFiveByMapCnt(campusId));
        return new ResponseEntity<>(
                responseMap
                , HttpStatus.OK);
    }
}
