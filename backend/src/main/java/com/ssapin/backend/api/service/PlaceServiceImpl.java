package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.PlaceRequest;
import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.RankingResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import com.ssapin.backend.api.domain.repositorysupport.*;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestPart;

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
    private final MapPlaceRepositorySupport mapPlaceRepositorySupport;
    private final MapRepositorySupport mapRepositorySupport;
    private final CampusRepository campusRepository;
    private final HashtagRepository hashtagRepository;
    private final MapHashtagRepositorySupport mapHashtagRepositorySupport;
    private final MapHashtagRepository mapHashtagRepository;
    private final MapRankingRepositorySupport mapRankingRepositorySupport;
    private final MapBookmarkRepository mapBookmarkRepository;
    private final MapBookmarkRepositorySupport mapBookmarkRepositorySupport;

    private final UserRankingRepositorySupport userRankingRepositorySupport;

    private final PlaceRepository placeRepository;
    private final MapPlaceRepository mapPlaceRepository;
    private final TogethermapPlaceRepository togethermapPlaceRepository;
    private final TogethermapRepository togethermapRepository;
    private final PlaceBookmarkRepository placeBookmarkRepository;

    private final TogethermapPlaceRepositorySupport togethermapPlaceRepositorySupport;


    /**
     * (1) 추천지도에 장소추가
     * Map_Plcae 테이블에 새로운 레코드 갱신되어야 함 !
     */
    @Override
    @Transactional
    public Long addPlaceInMap(User user, long mapId, PlaceRequest placeRequest)  {

        Map map =mapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        //디비에 장소 저장
        Place place = Place.builder()
                .itemId(placeRequest.getItemId())
                .title(placeRequest.getTitle())
                .lat(placeRequest.getLat())
                .lng(placeRequest.getLng())
                .address(placeRequest.getAddress())
                .build();

        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(placeRequest.getItemId());

        //디비에 없으면 저장하기
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
     * (2) 모여지도에 장소추가
     * Map_Plcae 테이블에 새로운 레코드 갱신되어야 함 !
     */
    @Override
    @Transactional
    public Long addPlaceInTogetherMap(User user,long mapId,PlaceRequest placeRequest)
    {
        Togethermap map =togethermapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        Place place = Place.builder()
                .itemId(placeRequest.getItemId())
                .title(placeRequest.getTitle())
                .lat(placeRequest.getLat())
                .lng(placeRequest.getLng())
                .address(placeRequest.getAddress())
                .build();

        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(placeRequest.getItemId());

        if(placeResponse.isEmpty())
        {
            placeRepository.save(place);
        }

        TogethermapPlace togethermapPlace = TogethermapPlace.builder()
                .togethermap(map)
                .user(user)
                .place(place)
                .build();

        long id= togethermapPlaceRepository.save(togethermapPlace).getId();

        return id;
    }

    @Override
    public List<RankingResponse> getListPlaceRanking(User user) {

        /**
         * 내가 랭킹 짜서 줘야 되자나 시발
         * 추천지도 기준
         *
         * 1. 가장 리뷰가 많은장소  리뷰테이블 placeId 갯수 세서 rank 해서 상단 한 개
         * select placeId,count(placeId) AS cnt
         * from Review LIMIT 1
         * where 캠퍼스.. = 캠퍼스
         * GROUP BY placeId
         * ORDER BY cnt asc;
         *
         * 2. 가장 북마크가 많이된 장소 placeBookmark 테이블 placeId 개수 세서 rank -> 1등 새끼..
         * select placeId,count(placeId) AS cnt
         * from PlaceBookmark LIMIT 1
         * GROUP BY placeId
         * ORDER BY cnt asc;
         *
         * 3. 추천지도에 가장 많이 추가된 장소 MapPlace 테이블 placeId 개수 세서 rank
         * select placeId,count(placeId) AS cnt
         * from MapPlace LIMIT 1
         * GROUP BY placeId
         * ORDER BY cnt asc;
         * 총 3개
         */



        return null;

    }

    @Override
    @Transactional
    public Long removePlaceInMap(User user,long mapId, long placeId) {
        /**
         * 사용자가 등록한 추천지도에서 장소 삭제
         * 추천 지도 id, 장소 id, user 정보
         */

        Map map = mapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place =placeRepository.findById(placeId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        MapPlace result = mapPlaceRepositorySupport.findByMapPlace(map,user,place);

        mapPlaceRepository.delete(result);


        return null;
    }

    @Override
    public Long removePlaceInTogetherMap(User user,long mapId, long placeId) {

        Togethermap map = togethermapRepository.findById(mapId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));
        Place place =placeRepository.findById(placeId).orElseThrow(()->new CustomException(ErrorCode.DATA_NOT_FOUND));

        TogethermapPlace result = togethermapPlaceRepositorySupport.findByPlace(map,user,place);

        togethermapPlaceRepository.delete(result);

        return null;
    }

    @Override
    public Optional<PlaceResponse> getPlaceInfo(User user,long itemId) {

        /**
         * 1. itemId로 Place table 조회
         *          *  1-1 장소가 없다면 추가
         *          *  1-2 이미 있다면 placeId 가져왕
         * 2. 리 턴
         */

        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);

        if(placeResponse.isEmpty())
        {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }


        return placeResponse;
    }


    /**
     * 해당 장소가 추가된 추천지도 리스트 조회
     */
    @Override
    public List<MapResponse> getMapListInPlace(User user , long itemId) {

        /**
         * 1. itemId로 Place table 조회
         *  1-1 장소가 없다면 추가
         *  1-2 이미 있다면 placeId 가져왕
         * 2. 추천지도 - 장소에서 placeID로 찾아.. 그리고 뽑으삼
         * 2-1 title로 mapId로 distinct
         *
         * 3.리스트 뽑기
         */

        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);

        if(placeResponse.isEmpty())
        {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        Place place = Place.builder()
                .itemId(placeResponse.get().getItemId())
                .title(placeResponse.get().getTitle())
                .lat(placeResponse.get().getLat())
                .lng(placeResponse.get().getLng())
                .address(placeResponse.get().getAddress())
                .build();

        return null;
    }

    @Override
    @Transactional
    public Long registerBookmark(User user, long itemId) {

        /**
         * 유저 -장소 테이블에 갱신
         * 1. 유저 테이블에서 유저정보 찾기
         * 2. 장소 테이블에서 장소 찾기
         *      2-1 장소가 없다면 추가
         *      2-2 이미 있다면 아이디 가져
         * 3. 유저 - 장소 테이블에 save하기
         */




        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);

        if(placeResponse.isEmpty())
        {

            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

            Place place = Place.builder()
                    .itemId(placeResponse.get().getItemId())
                    .title(placeResponse.get().getTitle())
                    .lat(placeResponse.get().getLat())
                    .lng(placeResponse.get().getLng())
                    .address(placeResponse.get().getAddress())
                    .build();


        PlaceBookmark placeBookmark = PlaceBookmark.builder()
                .user(user)
                .place(place)
                .build();

        long id = placeBookmarkRepository.save(placeBookmark).getId();

        return id;
    }

    @Override
    @Transactional
    public Long removeBookmark(User user, long itemId) {

        /**
         * 유저 -장소 테이블에 갱신
         * 1. 유저 테이블에서 유저정보 찾기
         * 2. 장소 테이블에서 장소 찾기
         *      2-1 장소가 없다면 추가
         *      2-2 이미 있다면 아이디 가져와
         * 3. 유저 - 장소 테이블에 삭제하기
         */

        Optional<PlaceResponse> placeResponse = placeRepository.findByItemId(itemId);

        if(placeResponse.isEmpty())
        {
            throw new CustomException(ErrorCode.DATA_NOT_FOUND);
        }

        Place place = Place.builder()
                .itemId(placeResponse.get().getItemId())
                .title(placeResponse.get().getTitle())
                .lat(placeResponse.get().getLat())
                .lng(placeResponse.get().getLng())
                .address(placeResponse.get().getAddress())
                .build();

        PlaceBookmark placeBookmark = PlaceBookmark.builder()
                .user(user)
                .place(place)
                .build();

       placeBookmarkRepository.delete(placeBookmark);

       // return id;


        return null;
    }
}
