package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.User;
import lombok.Getter;

import java.util.List;

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

    public MapResponse(Map map, User user, List<PlaceResponse> placeList, List<HashtagRequest> hashtagList) {
        this.mapId = map.getId();
        this.title = map.getTitle();
        this.userId = user.getId();
        this.nickname = user.getNickname();
        this.campusId = map.getCampus().getId();
        this.access = map.isAccess();
        this.userEmoji = user.getEmoji();
        this.mapEmoji = map.getEmoji();
        this.placeList = placeList;
        this.hashtagList = hashtagList;
    }
}
