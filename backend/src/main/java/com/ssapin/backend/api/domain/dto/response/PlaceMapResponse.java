package com.ssapin.backend.api.domain.dto.response;

import lombok.Getter;

import java.util.List;

public class PlaceMapResponse {


    @Getter
    static public class RankingResponse
    {
        private List<PlaceResponse> review;
        private List<PlaceResponse> bookmark;
        private List<PlaceResponse> pin;

        public RankingResponse(List<PlaceResponse> review, List<PlaceResponse> bookmark, List<PlaceResponse> pin) {
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
