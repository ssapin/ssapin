package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.PlaceRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface PlaceService {


    Long addPlaceInMap(User user, PlaceRegisterRequest placeRequest) ;

    Long addPlaceInTogetherMap(User user,long mapId,PlaceRequest placeRequest);

    List<Place> getListPlaceRanking(User user, long campus) ;

    Long removePlaceInMap(User user,long mapId, long placeId);

    Long removePlaceInTogetherMap(User user,long mapId, long placeId);

    Optional<PlaceResponse> getPlaceInfo(User user, long itemId);

    List<MapResponse> getMapListInPlace (User user, long itemId);

    Long registerBookmark(User user, long itemId);

    Long removeBookmark(User user, long itemId);

}
