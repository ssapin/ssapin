package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MapService {
    Long createMap(User user, MapRequest.MapRegister mapRegister);

    Long updateMap(MapRequest.MapEdit mapEdit);

    void deleteMap(long mapId);

    MapResponse detailMap(long mapId, User user);

    Page<MapResponse> getMapList(long campusId, List<HashtagRequest> hashtagList, String keyword, User user, Pageable pageable);

    List<MapResponse> getRankingList(long campusId, User user);

    void addBookmark(User user, long mapId);

    void deleteBookmark(User user, long mapId);

    List<Map> get5UserByCampus(long campusId);
}
