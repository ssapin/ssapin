package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.HashtagRepository;
import com.ssapin.backend.api.domain.repository.MapHashtagRepository;
import com.ssapin.backend.api.domain.repository.MapRepository;
import com.ssapin.backend.api.domain.repositorysupport.MapHashtagRepositorySupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class MapServiceImplTest {

    @InjectMocks
    private MapServiceImpl mapService;

    @Mock
    private MapHashtagRepository mapHashtagRepository;

    @Mock
    private HashtagRepository hashtagRepository;

    @Mock
    private MapRepository mapRepository;

    @Mock
    private CampusRepository campusRepository;

    @Mock
    private MapHashtagRepositorySupport mapHashtagRepositorySupport;

    @DisplayName("추천지도 생성 테스트")
    @Test
    void createMap() throws Exception {
        //given
        Campus testcampus = Campus.builder()
                .region("test campus")
                .build();
        User testuser = User.builder()
                .token("test token")
                .nickname("test nickname")
                .emoji("test emoji")
                .campus(testcampus)
                .build();
        Map testmap = Map.builder()
                .title("test map")
                .emoji("test emoji")
                .campus(testcampus)
                .access(true)
                .user(testuser)
                .build();

        List<HashtagRequest> hashtagList = new ArrayList<>();
        HashtagRequest hashtag = new HashtagRequest(1);
        Hashtag testhashtag = Hashtag.builder()
                .content("test hashtag")
                .build();
        hashtagList.add(hashtag);
        MapRequest.MapRegister registerRequest = new MapRequest.MapRegister(
                testmap.getCampus().getId(), testmap.getTitle(), testmap.getEmoji(), testmap.isAccess(), hashtagList
        );

        Long fakeMapId = 1l;
        ReflectionTestUtils.setField(testmap, "id", fakeMapId);

        //mocking
        given(campusRepository.findById(any())).willReturn(Optional.ofNullable(testcampus));
        given(mapRepository.save(any())).willReturn(testmap);
        given(mapRepository.findById(fakeMapId)).willReturn(Optional.ofNullable(testmap));
        given(hashtagRepository.findById(hashtag.getHashtagId())).willReturn(Optional.ofNullable(testhashtag));

        //when
        Long newMapId = mapService.createMap(testuser, registerRequest);

        //then
        Map findMap = mapRepository.findById(newMapId).get();
        assertEquals(testmap, findMap);
    }

    @DisplayName("추천지도 생성 테스트")
    @Test
    void updateMap() throws Exception {
        //given
        List<HashtagRequest> hashtagList = new ArrayList<>();
        HashtagRequest hashtag = new HashtagRequest(1);
        Hashtag originHashtag = Hashtag.builder()
                .content("test hashtag")
                .build();
        hashtagList.add(hashtag);

        createMap();
        Map originMap = mapRepository.findById(1L).get();
        List<MapHashtag> originList = new ArrayList<>();
        MapHashtag originmapHashtag = MapHashtag.builder()
                .map(originMap)
                .hashtag(originHashtag)
                .build();
        originList.add(originmapHashtag);

        Campus testcampus = Campus.builder()
                .region("test campus2")
                .build();
        User testuser = User.builder()
                .token("test token2")
                .nickname("test nickname2")
                .emoji("test emoji2")
                .campus(testcampus)
                .build();
        Map testmap = Map.builder()
                .title("test map2")
                .emoji("test emoji2")
                .campus(testcampus)
                .access(true)
                .user(testuser)
                .build();

        List<HashtagRequest> edithashtagList = new ArrayList<>();
        HashtagRequest newhashtag = new HashtagRequest(2);
        Hashtag testhashtag = Hashtag.builder()
                .content("test hashtag2")
                .build();
        edithashtagList.add(newhashtag);
        MapRequest.MapEdit editRequest = new MapRequest.MapEdit(
                originMap.getId(), testmap.getCampus().getId(), testmap.getTitle(), testmap.getEmoji(), testmap.isAccess(), edithashtagList
        );
        MapHashtag testmapHashtag = MapHashtag.builder()
                .map(testmap)
                .hashtag(testhashtag)
                .build();
        List<MapHashtag> testMapHashList = new ArrayList<>();
        testMapHashList.add(testmapHashtag);

        //mocking
        given(mapRepository.findById(originMap.getId())).willReturn(Optional.ofNullable(originMap));
        given(hashtagRepository.findById(newhashtag.getHashtagId())).willReturn(Optional.ofNullable(testhashtag));
        given(mapHashtagRepositorySupport.findByMapAndHashtag(originMap, originHashtag)).willReturn(testmapHashtag);
        given(mapHashtagRepositorySupport.findAllByMap(originMap)).willReturn(originList);
        given(hashtagRepository.findById(newhashtag.getHashtagId())).willReturn(Optional.ofNullable(testhashtag));

        //when
        Long newMapId = mapService.updateMap(editRequest);

        //then
        Map findMap = mapRepository.findById(newMapId).get();
        assertEquals(testmap.getCampus().getId(), findMap.getCampus().getId());
        assertEquals(testmap.getTitle(), findMap.getTitle());
        assertEquals(testmap.getEmoji(), findMap.getEmoji());
    }
}