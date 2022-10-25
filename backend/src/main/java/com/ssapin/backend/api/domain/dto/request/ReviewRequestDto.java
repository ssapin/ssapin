package com.ssapin.backend.api.domain.dto.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ApiModel("DiaryRequest")
public class ReviewRequestDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ReviewAdd {
        @ApiModelProperty(name = "장소아이디", example = "1")
        private long placeId;

        @ApiModelProperty(name = "이모지타입", example = "1")
        private int emojiType;

        @ApiModelProperty(name = "리뷰내용", example = "여기 존맛탱구리구리뱅뱅")
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class ReviewEdit {

        @ApiModelProperty(name = "리뷰아이디", example = "1")
        private long reviewId;

        @ApiModelProperty(name = "이모지타입", example = "1")
        private int emojiType;

        @ApiModelProperty(name = "리뷰내용", example = "여기 존맛탱구리구리뱅뱅")
        private String content;

    }


}
