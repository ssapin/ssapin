package com.ssapin.backend.api.controller;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(value = "추천지도 관련 API", tags={"Map"})
@RestController
@CrossOrigin("*")
@RequestMapping("/map")
@RequiredArgsConstructor
public class MapController {

    private final MapServiceImpl mapService;

    @PostMapping
    @ApiOperation(value = "추천지도 생성 ", notes = "사용자가 추천지도를 생성한다.")
    public ResponseEntity<?> addMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody MapRequest.MapRegister mapRegister) {
        try {
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
              User user = new User("test", "test", new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(mapService.createMap(user, mapRegister), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 생성 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping
    @ApiOperation(value = "추천지도 수정", notes = "사용자가 추천지도를 수정한다.")
    public ResponseEntity<?> editMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody MapRequest.MapEdit mapEdit) {
        try {
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<Long>(mapService.updateMap(mapEdit), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 수정 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    @ApiOperation(value = "추천지도 삭제", notes = "사용자가 추천지도를 삭제한다.")
    public ResponseEntity<?> deleteMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody Map<String, Long> requestMap) {
        try {
            long mapId = requestMap.get("mapId");
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");
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
    public ResponseEntity<?> detailMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @PathVariable long mapId) {
        try {
//            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
//            User user = userService.findOneUser(userId);
            User user = new User("test", "test", new Campus("test"), "test");
            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            else {
                return new ResponseEntity<MapResponse>(mapService.detailMap(user, mapId), HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("추천지도 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/{campusId}/main")
//    @ApiOperation(value = "추천지도 삭제", notes = "사용자가 추천지도를 삭제한다.")
//    public ResponseEntity<?> deleteMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody Map<String, Long> requestMap) {
//        try {
//            long mapId = requestMap.get("mapId");
////            long userId = jwtTokenUtil.getUserIdFromToken(accessToken);
////            User user = userService.findOneUser(userId);
//            User user = new User("test", "test", new Campus("test"), "test");
//            if (user == null) return new ResponseEntity<String>("로그인된 회원을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
//            else {
//                mapService.deleteMap(mapId);
//                return new ResponseEntity<String>("추천지도 삭제 성공", HttpStatus.OK);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<String>("추천지도 삭제 실패", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
