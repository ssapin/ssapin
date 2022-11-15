package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.entity.User;
import lombok.Getter;

@Getter
public class PlaceResponse {
    private long placeId;
    private long itemId;
    private String title;
    private double lat;
    private double lng;
    private String address;
    private String reviewContent;
    private long userId;
    private String userEmoji;
    private String nickname;

    public PlaceResponse(Place place, String content, User user) {
        this.placeId = place.getId();
        this.itemId = place.getItemId();
        this.title = place.getTitle();
        this.lat = place.getLat();
        this.lng = place.getLng();
        this.address = place.getAddress();
        this.reviewContent = content;
        this.userId = user.getId();
        this.userEmoji = user.getEmoji();
        this.nickname = user.getNickname();
    }


}
