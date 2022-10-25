package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.dto.request.MapRequest;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.repository.*;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapPlaceRepositorySupport;
import com.ssapin.backend.api.domain.repositorysupport.TogethermapRepositorySupport;
import com.ssapin.backend.exception.CustomException;
import com.ssapin.backend.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService {

    private final MapRepository mapRepository;
    private final CampusRepository campusRepository;
    private final HashtagRepository hashtagRepository;
    private final MapHashtagRepository mapHashtagRepository;

    @Override
    public Long createMap(User user, MapRequest.MapRegister mapRegister) {
        //Map 저장
        Campus campus = campusRepository.findById(mapRegister.getCampusId()).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND));
        Map map = Map.builder()
                .user(user)
                .access(mapRegister.getAccess())
                .campus(campus)
                .emoji(mapRegister.getEmoji())
                .title(mapRegister.getTitle())
                .build();
        Map result = mapRepository.save(map);

        //HashTag 저장
        for(HashtagRequest hashtag : mapRegister.getHashtagList()) {
            Hashtag hashTag = hashtagRepository.findById(mapRegister.getCampusId()).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND));
            MapHashtag mapHashtag = MapHashtag.builder()
                    .hashtag(hashTag)
                    .map(result)
                    .build();
            mapHashtagRepository.save(mapHashtag);
        }

        return result.getId();
    }
}
