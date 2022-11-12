package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.TogethermapRepository;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapPlaceRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapRepositorySupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class TogethermapServiceImplTest {
    @Mock
    private TogethermapRepository togethermapRepository;

    @Mock
    private TogethermapRepositorySupport togethermapRepositorySupport;

    @Mock
    private TogethermapPlaceRepositorySupport togethermapPlaceRepositorySupport;

    @Mock
    private CampusRepository campusRepository;

    @InjectMocks
    private TogethermapServiceImpl togethermapService;

    @DisplayName("모여지도 전체 조회 테스트")
    @Test
    void findAll() {
        //given
        Campus testcampus = Campus.builder()
                .region("test campus")
                .build();
        given(campusRepository.findById(any())).willReturn(Optional.ofNullable(testcampus));

        List<Togethermap> testmapList = new ArrayList<>();
        Togethermap testmap = Togethermap.builder()
                .title("test togethermap")
                .campus(testcampus)
                .build();
        testmapList.add(testmap);
        given(togethermapRepositorySupport.findAllByCampus(any())).willReturn(testmapList);

        List<TogethermapPlace> testmapplaceList = new ArrayList<>();
        Place testplace = Place.builder()
                .title("test place title")
                .lng(1)
                .lat(1)
                .itemId(1)
                .build();
        User testuser = User.builder()
                .kakaoId(1)
                .nickname("test nickname")
                .emoji("test emoji")
                .campus(testcampus)
                .build();
        TogethermapPlace testmapplace = TogethermapPlace.builder()
                .togethermap(testmap)
                .user(testuser)
                .place(testplace)
                .build();
        testmapplaceList.add(testmapplace);
        given(togethermapPlaceRepositorySupport.findByTogethermap(any())).willReturn(testmapplaceList);

        //when
        List<TogethermapResponse> result = togethermapService.findAll(testcampus.getId());
        System.out.println("result = " + result.get(0).getTitle());

        //then
        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getPlaceList().get(0).getPlaceId()).isEqualTo(testplace.getId());
        assertThat(result.get(0).getTogethermapId()).isEqualTo(testmap.getId());
    }

    @DisplayName("모여지도 상세 조회 테스트")
    @Test
    void findOne() {
        //given
        Campus testcampus = Campus.builder()
                .region("test campus")
                .build();
        Togethermap testmap = Togethermap.builder()
                .title("test togethermap")
                .campus(testcampus)
                .build();
        given(togethermapRepository.findById(any())).willReturn(Optional.ofNullable(testmap));

        List<TogethermapPlace> testmapplaceList = new ArrayList<>();
        Place testplace = Place.builder()
                .title("test place title")
                .lng(1)
                .lat(1)
                .itemId(1)
                .build();
        User testuser = User.builder()
                .kakaoId(1)
                .nickname("test nickname")
                .emoji("test emoji")
                .campus(testcampus)
                .build();
        TogethermapPlace testmapplace = TogethermapPlace.builder()
                .togethermap(testmap)
                .user(testuser)
                .place(testplace)
                .build();
        testmapplaceList.add(testmapplace);
        given(togethermapPlaceRepositorySupport.findByTogethermap(any())).willReturn(testmapplaceList);

        //when
        TogethermapResponse result = togethermapService.findOne(testmap.getId());
        System.out.println("result = " + result.getTitle());

        //then
        assertThat(result.getTogethermapId()).isEqualTo(testmap.getId());
        assertThat(result.getPlaceList().get(0).getPlaceId()).isEqualTo(testplace.getId());
    }
}