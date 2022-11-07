package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.User;
import com.ssapin.backend.api.domain.repository.PlaceBookmarkRepository;
import com.ssapin.backend.api.domain.repository.PlaceRepository;
import com.ssapin.backend.api.domain.repositorysupport.PlaceBookmarkRepositorySupport;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.ArrayList;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class PlaceBookmarkServiceImplTest {

    @InjectMocks
    PlaceBookmarkServiceImpl placeBookmarkService;

    @Mock
    PlaceBookmarkRepositorySupport placeBookmarkRepositorySupport;

    @Mock
    PlaceBookmarkRepository placeBookmarkRepository;

    @Mock
    PlaceRepository placeRepository;




    PlaceBookmark addPlaceBookmark() {

        Campus testCampus = Campus.builder()
                .region("test campus")
                .build();
        User testUser = User.builder()
                .kakaoId(1)
                .nickname("test nickname")
                .emoji("test emoji")
                .campus(testCampus)
                .build();
        Place testPlace = Place.builder()
                .title("test place")
                .itemId(1)
                .lat(1)
                .lng(1)
                .address("test address")
                .build();
        PlaceBookmark testPlaceBookmark = PlaceBookmark.builder()
                .place(testPlace)
                .user(testUser)
                .build();

        placeBookmarkRepository.save(testPlaceBookmark);
        placeRepository.save(testPlace);

        return  testPlaceBookmark;
    }

    @DisplayName("userId로 PlaceBookmark 조회")
    @Test
    void findPlaceBookmarkByUserId() {

        PlaceBookmark placeBookmark = addPlaceBookmark();
        List<PlaceBookmark> expectedOutput = new ArrayList<>();

        expectedOutput.add(placeBookmark);

        System.out.println("userId : " + placeBookmark.getUser().getId());
        long userId = expectedOutput.get(0).getUser().getId();

        given(placeBookmarkRepositorySupport.findByUserId(userId)).willReturn(expectedOutput);

        //when
        List<PlaceBookmark> result = placeBookmarkService.findPlaceBookmarkByUserId(userId);

        //then
        assertThat(result.size()).isEqualTo(expectedOutput.size());
        assertThat(result.get(0).getPlace().getId()).isEqualTo(expectedOutput.get(0).getPlace().getId());
        assertThat(result.get(0).getUser().getId()).isEqualTo(expectedOutput.get(0).getUser().getId());
    }
}