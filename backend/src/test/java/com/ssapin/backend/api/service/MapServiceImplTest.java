package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Hashtag;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.HashtagRepository;
import com.ssapin.backend.api.domain.repository.MapHashtagRepository;
import com.ssapin.backend.api.domain.repository.MapRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

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
    Map map;

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
}