package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.BookmarkRequest;
import com.ssapin.backend.api.domain.dto.request.PlaceMapRequest;
import com.ssapin.backend.api.domain.dto.request.PlaceRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.User;

import java.util.List;
import java.util.Optional;

public interface PlaceService {


    Long addPlaceInMap(User user, PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) ;

    Long addPlaceInTogetherMap(User user,PlaceMapRequest.RegisterPlaceToMapRequest placeRequest);

    PlaceMapResponse.RankingResponse getListPlaceRanking(User user, long campus) ;

    Long removePlaceInMap(User user,PlaceMapRequest.RemovePlaceInMapRequest removePlaceInMapRequest);

    Long removePlaceInTogetherMap(User user,PlaceMapRequest.RemovePlaceInTogethermapRequest removePlaceInTogethermapRequest);

    PlaceResponse getPlaceInfo(User user, long itemId);

    PlaceMapResponse.MapListResponse getMapListInPlace (User user, long itemId);

    Long registerBookmark(User user, BookmarkRequest bookmarkRequest);

    Long removeBookmark(User user, BookmarkRequest bookmarkRequest);

}
