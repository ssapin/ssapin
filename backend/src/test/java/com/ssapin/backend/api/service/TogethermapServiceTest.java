package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repository.TogethermapRepository;
import com.ssapin.backend.api.domain.repository.UserRepository;
import com.ssapin.backend.api.domain.repository.TogethermapPlaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TogethermapServiceTest {
    @Autowired
    private TogethermapRepository togethermapRepository;

    @Autowired
    private TogethermapPlaceRepository togethermapPlaceRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("모여지도 전체 조회 테스트")
    @Test
    @Transactional
    void findAll() {
        //given
        final TogethermapServiceImpl togethermapService = null;
        Campus campus = Campus.builder()
                .region("서울")
                .build();
        campusRepository.save(campus);

        User user = User.builder()
                .campus(campus)
                .emoji("test")
                .nickname("test")
                .token("test")
                .build();
        userRepository.save(user);

        Place place1 = Place.builder()
                .address("test1")
                .itemId(123)
                .lat((float) 1.1)
                .lng((float) 1.2)
                .title("test1")
                .build();
        placeRepository.save(place1);

        Place place2 = Place.builder()
                .address("test2")
                .itemId(123)
                .lat((float) 1.1)
                .lng((float) 1.2)
                .title("test2")
                .build();
        placeRepository.save(place2);

        Togethermap togethermap1 = Togethermap.builder()
                .campus(campus)
                .title("test1")
                .build();
        togethermapRepository.save(togethermap1);

        Togethermap togethermap2 = Togethermap.builder()
                .campus(campus)
                .title("test2")
                .build();
        togethermapRepository.save(togethermap2);

        TogethermapPlace togethermapPlace1 = TogethermapPlace.builder()
                .place(place1)
                .user(user)
                .togethermap(togethermap1)
                .build();
        togethermapPlaceRepository.save(togethermapPlace1);

        TogethermapPlace togethermapPlace2 = TogethermapPlace.builder()
                .place(place2)
                .user(user)
                .togethermap(togethermap2)
                .build();
        togethermapPlaceRepository.save(togethermapPlace2);

        List<PlaceResponse> placeList1 = new ArrayList<>();
        placeList1.add(new PlaceResponse(place1));

        List<PlaceResponse> placeList2 = new ArrayList<>();
        placeList2.add(new PlaceResponse(place2));

        //when
        List<TogethermapResponse> result = togethermapService.findAll(1);

        //then
        assertThat(result.size()).isEqualTo(2);

        assertThat(result.get(0).getPlaceList()).isEqualTo(placeList1);
        assertThat(result.get(1).getPlaceList()).isEqualTo(placeList2);

        assertThat(result.get(0).getTogethermapId()).isEqualTo(togethermap1.getId());
        assertThat(result.get(1).getTogethermapId()).isEqualTo(togethermap2.getId());
    }

    @DisplayName("모여지도 상세 조회 테스트")
    @Test
    void findOne() {
        //given
        final TogethermapServiceImpl togethermapService = null;
        Campus campus = Campus.builder()
                .region("서울")
                .build();
        campusRepository.save(campus);

        User user = User.builder()
                .campus(campus)
                .emoji("test")
                .nickname("test")
                .token("test")
                .build();
        userRepository.save(user);

        Place place1 = Place.builder()
                .address("test1")
                .itemId(123)
                .lat((float) 1.1)
                .lng((float) 1.2)
                .title("test1")
                .build();
        placeRepository.save(place1);

        Place place2 = Place.builder()
                .address("test2")
                .itemId(123)
                .lat((float) 1.1)
                .lng((float) 1.2)
                .title("test2")
                .build();
        placeRepository.save(place2);

        Togethermap togethermap = Togethermap.builder()
                .campus(campus)
                .title("test")
                .build();
        togethermapRepository.save(togethermap);

        TogethermapPlace togethermapPlace1 = TogethermapPlace.builder()
                .place(place1)
                .user(user)
                .togethermap(togethermap)
                .build();
        togethermapPlaceRepository.save(togethermapPlace1);

        TogethermapPlace togethermapPlace2 = TogethermapPlace.builder()
                .place(place2)
                .user(user)
                .togethermap(togethermap)
                .build();
        togethermapPlaceRepository.save(togethermapPlace2);

        List<PlaceResponse> placeList = new ArrayList<>();
        placeList.add(new PlaceResponse(place1));
        placeList.add(new PlaceResponse(place2));

        //when
        TogethermapResponse result = togethermapService.findOne(1);

        //then
        assertThat(result.getPlaceList().size()).isEqualTo(2);
        assertThat(result.getPlaceList()).isEqualTo(placeList);
        assertThat(result.getTogethermapId()).isEqualTo(togethermap.getId());
    }
}