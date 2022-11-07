package com.ssapin.backend.api.domain.dto.response;

import lombok.Getter;

@Getter
public class PlaceIdResponse {

    private long place_id;

    public PlaceIdResponse(long place_id)
    {
        this.place_id=place_id;
    }
}
