package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.BookmarkRequest;
import com.ssapin.backend.api.domain.dto.request.PlaceMapRequest;
import com.ssapin.backend.api.domain.dto.response.*;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import com.ssapin.backend.api.domain.repositorysupport.*;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.awt.desktop.SystemSleepEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

    /**
     * Place
     * <p>
     * (1) 추천지도에 장소추가
     * (2) 모여지도에 장소추가/업데이트
     * (3) 장소랭킹 리스트
     * (4) 추천지도에 장소 삭제
     * (5) 모여지도에 장소 삭제
     * (6) 장소 정보조회
     * (7) 해당장소가 추가된 추천지도 리스트 조회
     * (8) 장소 북마크
     * (9) 장소 북마크 해제
     */

    private final MapRepository mapRepository;

    private final MapRepositorySupport mapRepositorySupport;
    private final CampusRepository campusRepository;

    private final MapBookmarkRepository mapBookmarkRepository;
    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;

    private final MapPlaceRepositorySupport mapPlaceRepositorySupport;
    private final PlaceBookmarkRepositorySupport placeBookmarkRepositorySupport;
    private final ReviewRepositorySupport reviewRepositorySupport;


    private final PlaceRepository placeRepository;
    private final PlaceRepositorySupport placeRepositorySupport;
    private final MapPlaceRepository mapPlaceRepository;
    private final TogethermapPlaceRepository togethermapPlaceRepository;
    private final TogethermapRepository togethermapRepository;
    private final PlaceBookmarkRepository placeBookmarkRepository;


    private final TogethermapPlaceRepositorySupport togethermapPlaceRepositorySupport;


    /**
     * (1) 추천지도에 장소추가
     */
    @Override
    @Transactional
    public Long addPlaceInMap(User user, PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {

        Map map = mapRepository.findById(placeRequest.getMapId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        Place place = null;
        long id =0;
        Optional<Place> placeResponse = placeRepository.findByItemId(placeRequest.getPlace().getItemId());
        long placeId;
        if (placeResponse.isEmpty()) {
            place = Place.builder()
                    .itemId(placeRequest.getPlace().getItemId())
                    .title(placeRequest.getPlace().getTitle())
                    .lat(placeRequest.getPlace().getLat())
                    .lng(placeRequest.getPlace().getLng())
                    .address(placeRequest.getPlace().getAddress())
                    .build();
           id= placeRepository.saveAndFlush(place).getId();

            MapPlace mapPlace = MapPlace.builder()
                    .map(map)
                    .user(user)
                    .place(place)
                    .build();

            return id;

        } else {

            place = placeResponse.get();
            id = place.getId();

            MapPlace mapPlace = MapPlace.builder()
                    .map(map)
                    .user(user)
                    .place(place)
                    .build();

            return id;
        }


    }

    /**
     * (2) 모여지도에 장소추가/업데이트
     */
    @Override
    @Transactional
    public Long addPlaceInTogetherMap(User user, PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {


        Togethermap map = togethermapRepository.findById(placeRequest.getMapId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        Place place = null;

        Optional<Place> placeResponse = placeRepository.findByItemId(placeRequest.getPlace().getItemId());

        long placeId = 0;

        long id;
        if (placeResponse.isEmpty()) {

            place = Place.builder()
                    .itemId(placeRequest.getPlace().getItemId())
                    .title(placeRequest.getPlace().getTitle())
                    .lat(placeRequest.getPlace().getLat())
                    .lng(placeRequest.getPlace().getLng())
                    .address(placeRequest.getPlace().getAddress())
                    .build();
            placeId = placeRepository.save(place).getId();
        } else {
            place = placeResponse.get();
            placeId = place.getId();
        }


        TogethermapPlace result = togethermapPlaceRepositorySupport.findByPlace(map, user, placeId);
        if (result == null) {
            Place place1 = placeRepositorySupport.findPlace(place.getItemId());

            TogethermapPlace mapPlace = TogethermapPlace.builder()
                    .togethermap(map)
                    .user(user)
                    .place(place1)
                    .build();
            id = togethermapPlaceRepository.save(mapPlace).getId();
        } else {
            result.update(place, map);
            id = result.getId();
        }


        return placeId;
    }


    /**
     * (3) 장소랭킹 리스트
     */
    @Override
    @Transactional
    public PlaceMapResponse.RankingResponse getListPlaceRanking(long campusId) {

        System.out.println("캠퍼스 내용 : 서비스" + campusId);

        Campus campus = campusRepository.findById(campusId).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));


        PlaceMapResponse.PopularPlaceRankingResponse review = reviewRepositorySupport.findPopularPlaceByReview(campus);
        PlaceMapResponse.PlaceResponse reviewPlace = new PlaceMapResponse.PlaceResponse(placeRepository.findById(review.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)));

        PlaceMapResponse.PopularPlaceRankingResponse bookmark = placeBookmarkRepositorySupport.findPopularPlaceByBookmark(campus);
        PlaceMapResponse.PlaceResponse bookmarkPlace = new PlaceMapResponse.PlaceResponse(placeRepository.findById(bookmark.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)));

        PlaceMapResponse.PopularPlaceRankingResponse map = mapPlaceRepositorySupport.findPopularPlaceByMap(campus);
        PlaceMapResponse.PlaceResponse mapPlace = new PlaceMapResponse.PlaceResponse(placeRepository.findById(map.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND)));

        PlaceMapResponse.RankingResponse result = new PlaceMapResponse.RankingResponse(reviewPlace, bookmarkPlace, mapPlace);

        return result;

    }

    /**
     * (4) 추천지도에 장소 삭제
     */
    @Transactional
    @Override
    public Long removePlaceInMap(User user, PlaceMapRequest.RemovePlaceInMapRequest removePlaceInMapRequest) {

        Map map = mapRepository.findById(removePlaceInMapRequest.getMapId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place = placeRepository.findById(removePlaceInMapRequest.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        MapPlace mapPlace = mapPlaceRepositorySupport.findByMapPlace(map, user, place);

        MapPlace result = mapPlaceRepository.findById(mapPlace.getId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        long id = result.getId();

        mapPlaceRepository.delete(result);

        return id;
    }

    /**
     * (5) 모여지도에 장소 삭제
     */
    @Override
    @Transactional
    public Long removePlaceInTogetherMap(User user, PlaceMapRequest.RemovePlaceInTogethermapRequest removePlaceInTogethermapRequest) {

        Togethermap map = togethermapRepository.findById(removePlaceInTogethermapRequest.getTogethermapId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place = placeRepository.findById(removePlaceInTogethermapRequest.getPlaceId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        TogethermapPlace togethermapPlace = togethermapPlaceRepositorySupport.findByPlace(map, user, place.getId());

        TogethermapPlace result = togethermapPlaceRepository.findById(togethermapPlace.getId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));

        long id = result.getId();

        return id;
    }

    /**
     * (6) 장소 정보조회
     */
    @Override
    public PlaceInfoResponse getPlaceInfo(User user, long placeId) {

        Optional<Place> placeResponse = placeRepository.findById(placeId);

        boolean isBookmark = false;

        if (placeResponse.isEmpty()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        Place place = Place.builder()
                .itemId(placeResponse.get().getItemId())
                .title(placeResponse.get().getTitle())
                .lat(placeResponse.get().getLat())
                .lng(placeResponse.get().getLng())
                .address(placeResponse.get().getAddress())
                .build();

        if (user != null) {
            PlaceBookmark bookmark = placeBookmarkRepositorySupport.findByUserAndPlace(user.getId(), placeId);

            if (bookmark != null) {
                isBookmark = true;
            }
        }

        PlaceInfoResponse result = new PlaceInfoResponse(placeResponse.get().getId(), place, isBookmark);

        return result;
    }

    /**
     * (7)해당장소가 추가된 추천지도 리스트 조회
     */
    @Override
    public PlaceMapResponse.MapListResponse getMapListInPlace(long placeId) {
        Optional<Place> place = placeRepository.findById(placeId);


        if (place.isEmpty()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        } else if (place.isPresent()) {
            List<MapPlace> list = mapPlaceRepositorySupport.findbyPlace(placeId);

            List<PlaceMapResponse.MapResponse> result = new ArrayList<PlaceMapResponse.MapResponse>();

            for (MapPlace mp : list) {
                Map map = mapRepository.findById(mp.getMap().getId()).orElseThrow(() -> new CustomException(ErrorCode.DATA_NOT_FOUND));
                PlaceMapResponse.MapResponse resultMap = new PlaceMapResponse.MapResponse(map);

                result.add(resultMap);
            }

            PlaceMapResponse.MapListResponse resultMapList = new PlaceMapResponse.MapListResponse(result);

            return resultMapList;
        }

        throw new CustomException(ErrorCode.DATA_NOT_FOUND);
    }

    /**
     * (8) 장소 북마크
     */
    @Override
    public Long registerBookmark(User user, BookmarkRequest bookmarkRequest) {
        Optional<Place> placeResponse = placeRepository.findById(bookmarkRequest.getPlaceId());
        Place place =null;

        if (placeResponse.isEmpty()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        place =placeResponse.get();

        PlaceBookmark placeBookmark = PlaceBookmark.builder()
                .user(user)
                .place(place)
                .build();


        long id = placeBookmarkRepository.save(placeBookmark).getId();

        return id;
    }

    /**
     * (9) 장소 북마크 해제
     */
    @Override
    @Transactional
    public Long removeBookmark(User user, BookmarkRequest bookmarkRequest) {

        Optional<Place> placeResponse = placeRepository.findById(bookmarkRequest.getPlaceId());
        Place place =null;

        if (placeResponse.isEmpty()) {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        place =placeResponse.get();

        PlaceBookmark result =placeBookmarkRepositorySupport.findByUserAndPlace(user.getId(),place.getId());
        long id = result.getId();


        placeBookmarkRepository.delete(result);



        return id;
    }

    @Override
    @Transactional
    public long countPlaceByUserId(long userId) {

        return 1;
    }
}
