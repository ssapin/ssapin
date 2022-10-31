package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.repository.PlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PlaceServiceImplTest {

    @InjectMocks
    private PlaceServiceImpl placeService;

    @Mock
    private PlaceRepository placeRepository;

    @DisplayName("추천지도에 장소추가")
    @Test
    void addPlaceInMap()
    {

    }

    @DisplayName("모여지도에 장소 추가 /업데이트")
    @Test
    void addPlaceInTogethemap(){}

    @DisplayName("장소랭킹 리스트")
    @Test
    void getListPlaceRanking(){}


    @DisplayName("추천 지도에 장소 삭제")
    @Test
    void removePlaceInMap(){}

    @DisplayName("모여지도에서 장소 삭제")
    @Test
    void removePlaceInTogetherMap(){}


    @DisplayName("장소 상세 정보 조회")
    @Test
    void getPlaceInfo(){}

    @DisplayName("해당장소가 추가된 추천지도 리스트 조회")
    @Test
    void getMapListInPlace()
    {}

    @DisplayName("장소 북마크")
    @Test
    void registerBookmark(){}

    @DisplayName("장소 북마크 해제")
    @Test
    void removeBookmark(){}
}
