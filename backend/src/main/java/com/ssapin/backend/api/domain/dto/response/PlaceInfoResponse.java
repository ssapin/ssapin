package com.ssapin.backend.api.domain.dto.response;


import com.ssapin.backend.api.domain.entity.Place;
import lombok.Getter;

@Getter
public class PlaceInfoResponse {

    private long placeId;
    private long itemId;
    private String title;
    private float lat;
    private float lng;
    private String address;
    private boolean isBookmark;

    public PlaceInfoResponse(long placeId, Place place, boolean isBookmark) {
        this.placeId = placeId;
        this.itemId = place.getItemId();
        this.title = place.getTitle();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.address = place.getAddress();
        this.isBookmark = isBookmark;
    }
}
