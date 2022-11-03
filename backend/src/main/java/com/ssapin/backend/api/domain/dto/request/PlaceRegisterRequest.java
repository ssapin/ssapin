package com.ssapin.backend.api.domain.dto.request;


import lombok.Getter;

import java.util.List;

@Getter
public class PlaceRegisterRequest {

    private long mapId;
    private List<PlaceRequest> place;

    public PlaceRegisterRequest(long mapId, List<PlaceRequest> place) {
        this.mapId = mapId;
        this.place = place;
    }
}
