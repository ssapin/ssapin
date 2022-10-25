package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.request.MapRequest;
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

@Api(value = "추천지도 관련 API", tags={"Map"})
@RestController
@CrossOrigin("*")
@RequestMapping("/map")
@RequiredArgsConstructor
public class MapController {

    private final MapServiceImpl mapService;

    @PostMapping
    @ApiOperation(value = "추천지도 생성 ", notes = "사용자가 추천지도를 생성한다.")
    public ResponseEntity<?> addMap(@RequestHeader("ACCESS_TOKEN") final String accessToken, @RequestBody MapRequest.MapRegister mapRegister, float price) {
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
}
