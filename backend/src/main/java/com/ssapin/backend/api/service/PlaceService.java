package com.ssapin.backend.api.service;

/**
 * (1) 추천지도에 장소추가
 * (2) 모여지도에 장소추가/업데이트
 * (3) 장소랭킹 리스트
 * (4) 추천지도에 장소 삭제
 * (5) 모여지도에 장소 삭제
 * (6) 장소 정보조회
 * (7) 해당장소가 추가된 추천지도 리스트 조회
 * (8) 장소 북마크
 * (9) 장소 북마크 해제
 **/
public interface PlaceService {

    Long addPlaceInMap() ;

    Long addPlaceInTogetherMap();

    void getListPlaceRanking() ;

    void removePlaceInMap();

    void removePlaceInTogetherMap();

    void getPlaceInfo();

    void getMapListInPlace ();

    void registerBookmark();

    void removeBookmark();

}
