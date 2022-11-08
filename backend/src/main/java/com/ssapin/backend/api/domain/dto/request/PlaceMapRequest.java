package com.ssapin.backend.api.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class PlaceMapRequest {

    @Getter
    public static class RegisterPlaceToMapRequest{

        private long mapId;
        private PlaceRequest place;

        public RegisterPlaceToMapRequest(long mapId, PlaceRequest place) {
            this.mapId = mapId;
            this.place = place;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class RemovePlaceInMapRequest
    {
        private long mapId;
        private long placeId;

        public RemovePlaceInMapRequest(long mapId, long placeId) {
            this.mapId = mapId;
            this.placeId = placeId;
        }
    }

    @Getter
    @NoArgsConstructor
    public static class RemovePlaceInTogethermapRequest
    {
        private long togethermapId;
        private long placeId;

        public RemovePlaceInTogethermapRequest(long mapId, long placeId) {
            this.togethermapId = mapId;
            this.placeId = placeId;
        }
    }

}
