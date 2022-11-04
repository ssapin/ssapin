package com.ssapin.backend.api.domain.dto.response;

import lombok.Builder;
import lombok.Getter;

public class UserResponse {
    @Getter
    public static class Nickname {

        private boolean using;

        @Builder
        Nickname (boolean using){
            this.using = using;
        }
    }

    @Getter
    public static class Detail {
        private long userId;
        private String nickname;
        private long campusId;
        private String emoji;
        private long mapCnt;
        private long placeCnt;
        private long participateCnt;

        @Builder
        Detail (long userId, String nickname, long campusId, String emoji,
                long mapCnt, long placeCnt, long participateCnt){
            this.userId = userId;
            this.nickname = nickname;
            this.campusId = campusId;
            this.emoji = emoji;
            this.mapCnt = mapCnt;
            this.placeCnt = placeCnt;
            this.participateCnt = participateCnt;
        }
    }

    @Getter
    public static class BookmarkedPlace {
        private long placeId;
        private long itemId;
        private String title;
        private String address;
        private String content;

        @Builder
        BookmarkedPlace(long placeId, long itemId, String title, String address, String content){
            this.placeId = placeId;
            this.itemId = itemId;
            this.title = title;
            this.address = address;
            this.content = content;
        }
    }
}
