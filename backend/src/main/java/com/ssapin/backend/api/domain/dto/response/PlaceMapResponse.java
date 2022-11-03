package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Map;
import lombok.Getter;

import java.util.List;

public class PlaceMapResponse {


    @Getter
    static public class RankingResponse
    {
        private PlaceResponse review;
        private PlaceResponse bookmark;
        private PlaceResponse pin;

        public RankingResponse(PlaceResponse review, PlaceResponse bookmark, PlaceResponse pin) {
            this.review = review;
            this.bookmark = bookmark;
            this.pin = pin;
        }
    }

   @Getter
   static public class PopularPlaceRankingResponse{

        private long placeId;
        private int cnt;

        public PopularPlaceRankingResponse(int placeId, int cnt) {
            this.placeId = placeId;
            this.cnt = cnt;
        }
    }

    @Getter
    static public class MapListResponse
    {
        private List<MapResponse> mapList;

        public MapListResponse(List<MapResponse> mapList) {
            this.mapList = mapList;
        }
    }

    @Getter
    static public class MapResponse
    {
        private long mapId;
        private String title;
        private long userId;
        private String nickname;
        private long campusId;
        private boolean access;
        private String userEmoji;
        private String mapEmoji;

        public MapResponse(Map map) {
            this.mapId = map.getId();
            this.title = map.getTitle();
            this.userId = map.getUser().getId();
            this.nickname = map.getUser().getNickname();
            this.campusId = map.getCampus().getId();
            this.access = map.isAccess();
            this.userEmoji = map.getUser().getEmoji();
            this.mapEmoji = map.getEmoji();
        }
    }

}
