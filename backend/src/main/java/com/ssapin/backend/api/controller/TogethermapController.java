package com.ssapin.backend.api.controller;

import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.service.TogethermapServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "모여지도 관련 API", tags={"Togethermap"})
@RestController
@RequestMapping("/togethermap")
@RequiredArgsConstructor
public class TogethermapController {

    private final TogethermapServiceImpl togethermapService;

    @GetMapping("/{campusId}")
    @ApiOperation(value = "모여지도 리스트 조회 ", notes = "모여지도의 전체 리스트를 반환한다.")
    public ResponseEntity<?> getTogethermapList(@PathVariable long campusId) {
        return new ResponseEntity<List<TogethermapResponse>>(togethermapService.findAll(campusId), HttpStatus.OK);
    }

    @GetMapping("/{togethermapId}/detail")
    @ApiOperation(value = "모여지도 상세 조회 ", notes = "모여지도의 상세 정보를 반환한다.")
    public ResponseEntity<?> getTogethermap(@PathVariable long togethermapId) {
        return new ResponseEntity<TogethermapResponse>(togethermapService.findOne(togethermapId,false), HttpStatus.OK);
    }
}
