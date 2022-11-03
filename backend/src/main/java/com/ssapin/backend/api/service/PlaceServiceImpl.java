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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService{

    /**
     * Place
     *
     * (1) 추천지도에 장소추가
     * (2) 모여지도에 장소추가/업데이트
     * (3) 장소랭킹 리스트
     * (4) 추천지도에 장소 삭제
     * (5) 모여지도에 장소 삭제
     * (6) 장소 정보조회
     * (7) 해당장소가 추가된 추천지도 리스트 조회
     * (8) 장소 북마크
     * (9) 장소 북마크 해제
     * */

    private final MapRepository mapRepository;

    private final MapRepositorySupport mapRepositorySupport;
    private final CampusRepository campusRepository;

    private final MapBookmarkRepository mapBookmarkRepository;
    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;

    private final MapPlaceRepositorySupport mapPlaceRepositorySupport;
    private final PlaceBookmarkRepositorySupport placeBookmarkRepositorySupport;
    private final ReviewRepositorySupport reviewRepositorySupport;


    private final PlaceRepository placeRepository;
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

        Map map =mapRepository.findById(placeRequest.getMapId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        Place place = Place.builder()
                .itemId(placeRequest.getPlace().getItemId())
                .title(placeRequest.getPlace().getTitle())
                .lat(placeRequest.getPlace().getLat())
                .lng(placeRequest.getPlace().getLng())
                .address(placeRequest.getPlace().getAddress())
                .build();

        Optional<Place> placeResponse = placeRepository.findByItemId(placeRequest.getPlace().getItemId());

        if(placeResponse.isEmpty())
        {
            placeRepository.save(place);
        }

        MapPlace mapPlace = MapPlace.builder()
                .map(map)
                .user(user)
                .place(place)
                .build();

        long id= mapPlaceRepository.save(mapPlace).getId();

        return id;

    }

    /**
     * (2) 모여지도에 장소추가/업데이트
     */
    @Override
    public Long addPlaceInTogetherMap(User user, PlaceMapRequest.RegisterPlaceToMapRequest placeRequest) {


        Togethermap map =togethermapRepository.findById(placeRequest.getPlace().getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        Place place = Place.builder()
                .itemId(placeRequest.getPlace().getItemId())
                .title(placeRequest.getPlace().getTitle())
                .lat(placeRequest.getPlace().getLat())
                .lng(placeRequest.getPlace().getLng())
                .address(placeRequest.getPlace().getAddress())
                .build();

        Optional<Place> placeResponse = placeRepository.findByItemId(placeRequest.getPlace().getItemId());

        if(placeResponse.isEmpty())
        {
            placeRepository.save(place);
        }

        //Optional<TogethermapPlace> togethermapPlace = togethermapPlaceRepository.findById()

    return null;
    }


    /**
     * (3) 장소랭킹 리스트
     */
    @Override
    @Transactional
    public PlaceMapResponse.RankingResponse getListPlaceRanking(User user, long campusId) {

        Campus campus =campusRepository.findById(campusId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        PlaceMapResponse.PopularPlaceRankingResponse review =reviewRepositorySupport.findPopularPlaceByReview(campus);
        PlaceResponse reviewPlace =new PlaceResponse(placeRepository.findById(review.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND)));


        PlaceMapResponse.PopularPlaceRankingResponse bookmark=placeBookmarkRepositorySupport.findPopularPlaceByBookmark(campus);
        PlaceResponse bookmarkPlace = new PlaceResponse(placeRepository.findById(bookmark.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND)));

        PlaceMapResponse.PopularPlaceRankingResponse map =mapPlaceRepositorySupport.findPopularPlaceByMap(campus);
        PlaceResponse mapPlace = new PlaceResponse(placeRepository.findById(bookmark.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND)));

        PlaceMapResponse.RankingResponse result = new PlaceMapResponse.RankingResponse(reviewPlace,bookmarkPlace,mapPlace);

        return result;
    }

    /**
     * (4) 추천지도에 장소 삭제
     */
    @Transactional
    @Override
    public Long removePlaceInMap(User user, PlaceMapRequest.RemovePlaceInMapRequest removePlaceInMapRequest) {

        Map map = mapRepository.findById(removePlaceInMapRequest.getMapId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place =placeRepository.findById(removePlaceInMapRequest.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        MapPlace result = mapPlaceRepositorySupport.findByMapPlace(map,user,place);

        mapPlaceRepository.delete(result);

        return null;
    }
    /**
     * (5) 모여지도에 장소 삭제
     */
    @Override
    public Long removePlaceInTogetherMap(User user, PlaceMapRequest.RemovePlaceInTogethermapRequest removePlaceInTogethermapRequest) {

        Togethermap map = togethermapRepository.findById(removePlaceInTogethermapRequest.getTogethermapId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place =placeRepository.findById(removePlaceInTogethermapRequest.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        TogethermapPlace result = togethermapPlaceRepositorySupport.findByPlace(map,user,place);

        return null;
    }

    /**
     * (6) 장소 정보조회
     */
    @Override
    public PlaceResponse getPlaceInfo(User user, long itemId) {
        return null;
    }

    /**
     * (7)해당장소가 추가된 추천지도 리스트 조회
     */
    @Override
    public PlaceMapResponse.MapListResponse getMapListInPlace(User user, long itemId) {
        Optional<Place> place = placeRepository.findByItemId(itemId);


        if(place.isEmpty())
        {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }
        else if(place.isPresent())
        {
            List<MapPlace> list = mapPlaceRepository.findByPlace(place.get().getId());
        }


        return placeResponse;
    }

    /**
     * (8) 장소 북마크
     */
    @Override
    public Long registerBookmark(User user, BookmarkRequest bookmarkRequest) {
        return null;
    }

    /**
     * (9) 장소 북마크 해제
     */
    @Override
    public Long removeBookmark(User user, BookmarkRequest bookmarkRequest) {
        return null;
    }


//    /**
//     * (1) 추천지도에 장소추가
//     * Map_Plcae 테이블에 새로운 레코드 갱신되어야 함 !
//     */
//    @Override
//    @Transactional
//    public Long addPlaceInMap(User user, PlaceRegisterRequest placeRequest)  {
//
//        Map map =mapRepository.findById(placeRequest.getMapId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        //디비에 장소 저장
//        Place place = Place.builder()
//                .itemId(placeRequest.getPlace().get(0).getItemId())
//                .title(placeRequest.getPlace().get(0).getTitle())
//                .lat(placeRequest.getPlace().get(0).getLat())
//                .lng(placeRequest.getPlace().get(0).getLng())
//                .address(placeRequest.getPlace().get(0).getAddress())
//                .build();
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(placeRequest.getPlace().get(0).getItemId());
//
//        //디비에 없으면 저장하기
//        if(placeResponse.isEmpty())
//        {
//            placeRepository.save(place);
//        }
//
//        MapPlace mapPlace = MapPlace.builder()
//                .map(map)
//                .user(user)
//                .place(place)
//                .build();
//
//        long id= mapPlaceRepository.save(mapPlace).getId();
//
//        return id;
//    }
//
//
//
//    /**
//     * (2) 모여지도에 장소추가
//     * Map_Plcae 테이블에 새로운 레코드 갱신되어야 함 !
//     */
//    @Override
//    @Transactional
//    public Long addPlaceInTogetherMap(User user, PlaceAPIRequest.TogetherMapRequest togetherMapRequest)
//    {
//        Togethermap map =togethermapRepository.findById(togetherMapRequest.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        Place place = Place.builder()
//                .itemId(placeRequest.getItemId())
//                .title(placeRequest.getTitle())
//                .lat(placeRequest.getLat())
//                .lng(placeRequest.getLng())
//                .address(placeRequest.getAddress())
//                .build();
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(placeRequest.getItemId());
//
//        if(placeResponse.isEmpty())
//        {
//            placeRepository.save(place);
//        }
//
//        TogethermapPlace togethermapPlace = TogethermapPlace.builder()
//                .togethermap(map)
//                .user(user)
//                .place(place)
//                .build();
//
//        long id= togethermapPlaceRepository.save(togethermapPlace).getId();
//
//        return id;
//    }
//
//    @Override
//    public PlaceAPIResponse getListPlaceRanking(User user, long campusId) {
//
//        Campus campus =campusRepository.findById(campusId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        PopularPlaceRankingResponse review =reviewRepositorySupport.findPopularPlaceByReview(campus);
//        Place reviewPlace = placeRepository.findById(review.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//     //   PlaceResponse r =PlaceResponse.
//
//
//
//        PopularPlaceRankingResponse bookmark=placeBookmarkRepositorySupport.findPopularPlaceByBookmark(campus);
//        Place bookmarkPlace = placeRepository.findById(bookmark.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        PopularPlaceRankingResponse map =mapPlaceRepositorySupport.findPopularPlaceByMap(campus);
//        Place mapPlace = placeRepository.findById(bookmark.getPlaceId()).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        PlaceAPIResponse result = new PlaceAPIResponse(reviewPlace,bookmarkPlace,mapPlace);
//
//
//
//
//        /**
//         * 내가 랭킹 짜서 줘야 되자나 시발
//         * 추천지도 기준
//         *
//         * 1. 가장 리뷰가 많은장소  리뷰테이블 placeId 갯수 세서 rank 해서 상단 한 개
//         * select placeId,count(placeId) AS cnt
//         * from Review LIMIT 1
//         * where 캠퍼스.. = 캠퍼스
//         * GROUP BY placeId
//         * ORDER BY cnt asc;
//         *
//         * 2. 가장 북마크가 많이된 장소 placeBookmark 테이블 placeId 개수 세서 rank -> 1등 새끼..
//         * select placeId,count(placeId) AS cnt
//         * from PlaceBookmark LIMIT 1
//         * GROUP BY placeId
//         * ORDER BY cnt asc;
//         *
//         * 3. 추천지도에 가장 많이 추가된 장소 MapPlace 테이블 placeId 개수 세서 rank
//         * select placeId,count(placeId) AS cnt
//         * from MapPlace LIMIT 1
//         * GROUP BY placeId
//         * ORDER BY cnt asc;
//         * 총 3개
//         */
//
//
//
//
//
//        return result;
//
//    }
//
//    @Override
//    @Transactional
//    public Long removePlaceInMap(User user,long mapId, long placeId) {
//        /**
//         * 사용자가 등록한 추천지도에서 장소 삭제
//         * 추천 지도 id, 장소 id, user 정보
//         */
//
//        Map map = mapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//        Place place =placeRepository.findById(placeId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        MapPlace result = mapPlaceRepositorySupport.findByMapPlace(map,user,place);
//
//        mapPlaceRepository.delete(result);
//
//
//        return null;
//    }
//
//    @Override
//    public Long removePlaceInTogetherMap(User user,long mapId, long placeId) {
//
//        Togethermap map = togethermapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//        Place place =placeRepository.findById(placeId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
//
//        TogethermapPlace result = togethermapPlaceRepositorySupport.findByPlace(map,user,place);
//
//        togethermapPlaceRepository.delete(result);
//
//        return null;
//    }
//
//    @Override
//    public Optional<PlaceResponse> getPlaceInfo(User user,long itemId) {
//
//        /**
//         * 1. itemId로 Place table 조회
//         *          *  1-1 장소가 없다면 추가
//         *          *  1-2 이미 있다면 placeId 가져왕
//         * 2. 리 턴
//         */
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);
//
//        if(placeResponse.isEmpty())
//        {
//            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
//        }
//
//
//        return placeResponse;
//    }
//
//
//    /**
//     * 해당 장소가 추가된 추천지도 리스트 조회
//     */
//    @Override
//    public List<MapResponse> getMapListInPlace(User user , long itemId) {
//
//        /**
//         * 1. itemId로 Place table 조회
//         *  1-1 장소가 없다면 추가
//         *  1-2 이미 있다면 placeId 가져왕
//         * 2. 추천지도 - 장소에서 placeID로 찾아.. 그리고 뽑으삼
//         * 2-1 title로 mapId로 distinct
//         *
//         * 3.리스트 뽑기
//         */
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);
//
//        if(placeResponse.isEmpty())
//        {
//            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
//        }
//
//        Place place = Place.builder()
//                .itemId(placeResponse.get().getItemId())
//                .title(placeResponse.get().getTitle())
//                .lat(placeResponse.get().getLat())
//                .lng(placeResponse.get().getLng())
//                .address(placeResponse.get().getAddress())
//                .build();
//
//        return null;
//    }
//
//    @Override
//    @Transactional
//    public Long registerBookmark(User user, long itemId) {
//
//        /**
//         * 유저 -장소 테이블에 갱신
//         * 1. 유저 테이블에서 유저정보 찾기
//         * 2. 장소 테이블에서 장소 찾기
//         *      2-1 장소가 없다면 추가
//         *      2-2 이미 있다면 아이디 가져
//         * 3. 유저 - 장소 테이블에 save하기
//         */
//
//
//
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);
//
//        if(placeResponse.isEmpty())
//        {
//
//            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
//        }
//
//            Place place = Place.builder()
//                    .itemId(placeResponse.get().getItemId())
//                    .title(placeResponse.get().getTitle())
//                    .lat(placeResponse.get().getLat())
//                    .lng(placeResponse.get().getLng())
//                    .address(placeResponse.get().getAddress())
//                    .build();
//
//
//        PlaceBookmark placeBookmark = PlaceBookmark.builder()
//                .user(user)
//                .place(place)
//                .build();
//
//        long id = placeBookmarkRepository.save(placeBookmark).getId();
//
//        return id;
//    }
//
//    @Override
//    @Transactional
//    public Long removeBookmark(User user, long itemId) {
//
//        /**
//         * 유저 -장소 테이블에 갱신
//         * 1. 유저 테이블에서 유저정보 찾기
//         * 2. 장소 테이블에서 장소 찾기
//         *      2-1 장소가 없다면 추가
//         *      2-2 이미 있다면 아이디 가져와
//         * 3. 유저 - 장소 테이블에 삭제하기
//         */
//
//        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);
//
//        if(placeResponse.isEmpty())
//        {
//            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
//        }
//
//        Place place = Place.builder()
//                .itemId(placeResponse.get().getItemId())
//                .title(placeResponse.get().getTitle())
//                .lat(placeResponse.get().getLat())
//                .lng(placeResponse.get().getLng())
//                .address(placeResponse.get().getAddress())
//                .build();
//
//        PlaceBookmark placeBookmark = PlaceBookmark.builder()
//                .user(user)
//                .place(place)
//                .build();
//
//       placeBookmarkRepository.delete(placeBookmark);
//
//       // return id;
//
//
//        return null;
//    }
}
