package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.service.MapServiceImpl;
import com.ssapin.backend.api.service.TogethermapServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(value = "추천지도 관련 API", tags={"Map"})
@RestController
@CrossOrigin("*")
@RequestMapping("/map")
@RequiredArgsConstructor
public class MapController {

    private final MapServiceImpl mapService;

    @PostMapping("/login")
    @ApiOperation(value = "추천지도 생성 ", notes = "사용자가 추천지도를 생성한다.")
    public ResponseEntity<?> addMap(@RequestHeader("accessToken") final String accessToken, @RequestBody MapRequest.MapRegister mapRegister) {
        try {
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
              User user = new User("dd", 1, new Campus("서울"), "dd");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(mapService.createMap(user, mapRegister), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 생성 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/login")
    @ApiOperation(value = "추천지도 수정", notes = "사용자가 추천지도를 수정한다.")
    public ResponseEntity<?> editMap(@RequestHeader("accessToken") final String accessToken, @RequestBody MapRequest.MapEdit mapEdit) {
        try {
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", 1, new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(mapService.updateMap(mapEdit), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/login")
    @ApiOperation(value = "추천지도 삭제", notes = "사용자가 추천지도를 삭제한다.")
    public ResponseEntity<?> deleteMap(@RequestHeader("accessToken") final String accessToken, @RequestBody Map<String, Long> requestMap) {
        try {
            long mapId = requestMap.get("mapId");
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", 1, new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                mapService.deleteMap(mapId);
                return new ResponseEntity<String>("추천지도 삭제 성공", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{mapId}/detail")
    @ApiOperation(value = "추천지도 상세 조회", notes = "사용자가 추천지도를 상세 조회한다.")
    public ResponseEntity<?> detailMap(@RequestHeader("accessToken") final String accessToken, @PathVariable long mapId) {
        try {
            //            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = null;
            return new ResponseEntity<MapResponse>(mapService.detailMap(mapId, user), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @ApiOperation(value = "추천지도 리스트", notes = "필터링을 포함한 추천지도 리스트를 조회한다.")
    public ResponseEntity<?> getMapList(@RequestHeader("accessToken") final String accessToken,
                                        @RequestParam(required = false) List<Long> hashtagList, @RequestParam(required = false) String keyword, @RequestParam long campusId, @PageableDefault(size=6) Pageable pageable) {
        try {
            //            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = null;
            return new ResponseEntity<Page<MapResponse>>(mapService.getMapList(campusId, hashtagList, keyword, user, pageable), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 메인 리스트 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{campusId}/ranking")
    @ApiOperation(value = "추천지도 랭킹 리스트", notes = "추천지도 랭킹 리스트를 조회한다.")
    public ResponseEntity<?> getRankingList(@RequestHeader("accessToken") final String accessToken, @PathVariable long campusId) {
        try {
            //            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
            //            User user = userService.findOneUser(userId);
            User user = null;
            return new ResponseEntity<List<MapResponse>>(mapService.getRankingList(campusId, user), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 메인 리스트 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login/bookmark")
    @ApiOperation(value = "추천지도 북마크", notes = "사용자가 추천지도를 북마크한다.")
    public ResponseEntity<?> addBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody Map<String, Long> request) {
        try {
            long mapId = request.get("mapId");
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", 1, new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                mapService.addBookmark(user, mapId);
                return new ResponseEntity<String>("추전지도 북마크 성공", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 메인 리스트 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/login/bookmark")
    @ApiOperation(value = "추천지도 북마크 해제", notes = "사용자가 추천지도 북마크를 해제한다.")
    public ResponseEntity<?> deleteBookmark(@RequestHeader("accessToken") final String accessToken, @RequestBody Map<String, Long> request) {
        try {
            long mapId = request.get("mapId");
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", 1, new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                mapService.deleteBookmark(user, mapId);
                return new ResponseEntity<String>("추전지도 북마크 해제 성공", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 메인 리스트 조회 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
