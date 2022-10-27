package com.ssapin.backend.api.domain.dto.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@ApiModel("DiaryRequest")
public class ReviewRequest {

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

        public ReviewAdd(long placeId, int emojiType, String content) {
            this.placeId = placeId;
            this.emojiType = emojiType;
            this.content = content;
        }
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


        public ReviewEdit(long reviewId, int emojiType, String content) {
            this.reviewId = reviewId;
            this.emojiType = emojiType;
            this.content = content;
        }
    }


}
