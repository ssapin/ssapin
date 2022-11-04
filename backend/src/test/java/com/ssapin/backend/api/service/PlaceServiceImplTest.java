package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class PlaceServiceImplTest {

    @InjectMocks
    private PlaceServiceImpl placeService;

    @Mock
    private PlaceRepository placeRepository;

    @Mock
    private CampusRepository campusRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MapRepository mapRepository;

    @Mock
    private MapPlaceRepository mapPlaceRepository;


    @DisplayName("추천지도에 장소추가 테스트 ")
    @Test
    void addPlaceInMap() throws Exception
    {

        //given

        Campus testCampus = Campus.builder()
                .region("test campus")
                .build();

        User testUser = User.builder()
                .token("test token")
                .nickname("test nickname")
                .emoji("test emoji")
                .campus(testCampus)
                .build();

        Map testMap = Map.builder()
                .campus(testCampus)
                .title("test mapTitle")
                .access(true)
                .user(testUser)
                .emoji("test emoji")
                .build();

        Place testPlace = Place.builder()
                .itemId(1L)
                .title("test placeTitle")
                .lat(0L)
                .lng(0L)
                .address("test address")
                .build();

        MapPlace testMapPlace = MapPlace.builder()
                .map(testMap)
                .place(testPlace)
                .user(testUser)
                .build();

        Long fakeMapPlaceId =1L;
        ReflectionTestUtils.setField(testMapPlace,"id",fakeMapPlaceId);
        // ReflectionTestUtils.setField(대상 객체, "변수명", 원하는 값);

        //mocking
        given(campusRepository.findById(any())).willReturn(Optional.ofNullable(testCampus));
        given(mapRepository.findById(any())).willReturn(Optional.ofNullable(testMap));
        given(placeRepository.findById(any())).willReturn(Optional.ofNullable(testPlace));


    }

    @DisplayName("모여지도에 장소 추가 /업데이트 테스트")
    @Test
    void addPlaceInTogetherMap() throws Exception{}

    @DisplayName("장소랭킹 리스트 테스트")
    @Test
    void getListPlaceRanking() throws Exception
    {

    }


    @DisplayName("추천 지도에 장소 삭제 테스트")
    @Test
    void removePlaceInMap() throws Exception
    {

    }

    @DisplayName("모여지도에서 장소 삭제 테스트")
    @Test
    void removePlaceInTogetherMap() throws Exception{}


    @DisplayName("장소 상세 정보 조회 테스트")
    @Test
    void getPlaceInfo()throws Exception{}

    @DisplayName("해당장소가 추가된 추천지도 리스트 조회 테스트")
    @Test
    void getMapListInPlace ()throws Exception
    {}

    @DisplayName("장소 북마크 테스트")
    @Test
    void registerBookmark()throws Exception{}

    @DisplayName("장소 북마크 해제 테스트")
    @Test
    void removeBookmark()throws Exception{}
}
