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
    private boolean bookMark;

    public MapResponse(Map map, List<PlaceResponse> placeList, List<HashtagRequest> hashtagList, boolean bookMark) {
        this.mapId = map.getId();
        this.title = map.getTitle();
        this.userId = map.getUser().getId();
        this.nickname = map.getUser().getNickname();
        this.campusId = map.getCampus().getId();
        this.access = map.isAccess();
        this.userEmoji = map.getUser().getEmoji();
        this.mapEmoji = map.getEmoji();
        this.placeList = placeList;
        this.hashtagList = hashtagList;
        this.bookMark = bookMark;
    }
}
