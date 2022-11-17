package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.User;
import lombok.Getter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
public class MapResponse {
    private long mapId;
    private String title;
    private long userId;
    private String nickname;
    private long campusId;
    private boolean access;
    private String userEmoji;
    private String mapEmoji;
    private List<PlaceResponse> placeList;
    private List<HashtagRequest> hashtagList;
    private long placeCnt;
    private long userCnt;
    private boolean bookMark;

    public MapResponse(Map map, List<PlaceResponse> placeList, List<HashtagRequest> hashtagList, boolean bookMark, boolean isList) {
        this.mapId = map.getId();
        this.title = map.getTitle();
        this.userId = map.getUser().getId();
        this.nickname = map.getUser().getNickname();
        this.campusId = map.getCampus().getId();
        this.access = map.isAccess();
        this.userEmoji = map.getUser().getEmoji();
        this.mapEmoji = map.getEmoji();
        if(!isList) this.placeList = placeList;
        this.placeCnt = placeList==null? 0 : placeList.size();
        if(placeList==null || placeList.size()==0) {
            this.userCnt=0;
        } else {
            Set<Long> userSet = new HashSet<>();
            for(PlaceResponse placeResponse : placeList) {
                userSet.add(placeResponse.getUserId());
            }
            this.userCnt = userSet.size();
        }
        this.hashtagList = hashtagList;
        this.bookMark = bookMark;
    }
}
