package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.Togethermap;
import lombok.Getter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class TogethermapResponse {
    private long togethermapId;
    private String title;
    private long campusId;
    private List<PlaceResponse> placeList;
    private long userCnt;

    public TogethermapResponse (Togethermap togethermap, List<PlaceResponse> placeList) {
        this.togethermapId = togethermap.getId();
        this.title = togethermap.getTitle();
        this.campusId = togethermap.getCampus().getId();
        this.placeList = placeList;
        if(placeList==null || placeList.size()==0) {
            this.userCnt=0;
        } else {
            Set<Long> userSet = new HashSet<>();
            for(PlaceResponse placeResponse : placeList) {
                userSet.add(placeResponse.getUserId());
            }
            this.userCnt = userSet.size();
        }
    }
}
