package com.ssapin.backend.api.domain.dto.response;

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

    static public class MapListResponse
    {
        private List<PlaceResponse> mapList;

        public MapListResponse(List<PlaceResponse> mapList) {
            this.mapList = mapList;
        }
    }

}
