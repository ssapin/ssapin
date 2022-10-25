package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Togethermap;
import lombok.Getter;

import java.util.List;

@Getter
public class TogethermapResponse {
    private long togethermapId;
    private String title;
    private long campusId;
    private List<PlaceResponse> placeList;

    public TogethermapResponse (Togethermap togethermap, List<PlaceResponse> placeList) {
        this.togethermapId = togethermap.getId();
        this.title = togethermap.getTitle();
        this.campusId = togethermap.getCampus().getId();
        this.placeList = placeList;
    }
}
