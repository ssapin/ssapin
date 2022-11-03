package com.ssapin.backend.api.domain.dto.response;


import lombok.Getter;

@Getter
public class PopularPlaceRankingResponse{

    private long placeId;
    private int cnt;

    public PopularPlaceRankingResponse(int placeId, int cnt) {
        this.placeId = placeId;
        this.cnt = cnt;
    }
}
