package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import lombok.Getter;

@Getter
public class PlaceResponse {
    private long placeId;
    private long itemId;
    private String title;
    private float lat;
    private float lng;
    private String address;

    private String reviewContent;

    public PlaceResponse(Place place, String content) {
        this.placeId = place.getId();
        this.itemId = place.getItemId();
        this.title = place.getTitle();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.address = place.getAddress();
        this.reviewContent = content;
    }
}
