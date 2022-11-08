package com.ssapin.backend.api.domain.dto.request;

import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.entity.Place;
import lombok.Getter;

@Getter
public class PlaceRequest {

    private long itemId;
    private String title;
    private float lat;
    private float lng;
    private String address;

    public PlaceRequest(Place place) {
        this.itemId = place.getItemId();
        this.title = place.getTitle();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.address = place.getAddress();
    }

}
