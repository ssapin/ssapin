package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.Place;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class PlaceMapResponse {


    @Getter
    static public class RankingResponse {
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
    static public class MapListResponse
    {
        private List<PlaceMapResponse.MapResponse> mapList;

        public MapListResponse(List<PlaceMapResponse.MapResponse> mapList) {
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

    @Getter
    static public class PlaceResponse
    {
        private long placeId;
        private long itemId;
        private String title;
        private double lat;
        private double lng;
        private String address;

        public PlaceResponse(Place place) {
            this.placeId = place.getId();
            this.itemId = place.getItemId();
            this.title = place.getTitle();
            this.lat = place.getLat();
            this.lng = place.getLng();
            this.address = place.getAddress();
        }
    }
}
