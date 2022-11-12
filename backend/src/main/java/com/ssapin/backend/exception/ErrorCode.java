package com.ssapin.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public enum ErrorCode {


    //예시
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "찾을 수 없는 유저입니다."),
    DATA_NOT_FOUND(HttpStatus.BAD_REQUEST, "요청된 값으로 데이터를 찾을 수 없습니다."),
    MAP_NOT_EMOJI(HttpStatus.BAD_REQUEST, "Bad Map Emoji"),
    USER_NOT_EMOJI(HttpStatus.BAD_REQUEST, "Bad User Emoji"),
    AUTHENTICATION_FAILED(HttpStatus.FORBIDDEN, "Authentication Failed");


    private final HttpStatus status;
    private final String message;

}
