package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Review;
import com.ssapin.backend.api.domain.entity.Togethermap;
import com.ssapin.backend.api.domain.entity.TogethermapPlace;
import com.ssapin.backend.api.domain.repository.CampusRepository;
import com.ssapin.backend.api.domain.repository.TogethermapRepository;
import com.ssapin.backend.api.domain.repositorysupport.ReviewRepositorySupport;
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
public class TogethermapServiceImpl implements TogethermapService {

    private final TogethermapRepositorySupport togethermapRepositorySupport;
    private final TogethermapPlaceRepositorySupport togethermapPlaceRepositorySupport;
    private final CampusRepository campusRepository;
    private final TogethermapRepository togethermapRepository;
    private final ReviewRepositorySupport reviewRepositorySupport;

    @Override
    public TogethermapResponse findOne(long togethermapId, boolean isList) {
        Togethermap togethermap = togethermapRepository.findById(togethermapId).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND) );
        List<TogethermapPlace> togethermapPlaceList = togethermapPlaceRepositorySupport.findByTogethermap(togethermap);
        List<PlaceResponse> placeList = new ArrayList<>();
        for(TogethermapPlace togethermapPlace : togethermapPlaceList) {
            List<Review> review = reviewRepositorySupport.findAllByPlace(togethermapPlace.getPlace());
            if(review.isEmpty()) placeList.add(new PlaceResponse(togethermapPlace.getPlace(), null, togethermapPlace.getUser()));
            else placeList.add(new PlaceResponse(togethermapPlace.getPlace(), review.get(review.size()-1).getContent(), togethermapPlace.getUser()));
        }
        return new TogethermapResponse(togethermap, placeList, isList);
    }

    @Override
    public List<TogethermapResponse> findAll(long campusId) {
        List<TogethermapResponse> result = new ArrayList<>();
        Campus campus = campusRepository.findById(campusId).orElseThrow(() ->  new CustomException(ErrorCode.DATA_NOT_FOUND) );
        List<Togethermap> togethermaps = togethermapRepositorySupport.findAllByCampus(campus);
        for(Togethermap map : togethermaps) {
            List<TogethermapPlace> togethermapPlaceList = togethermapPlaceRepositorySupport.findByTogethermap(map);
            if (togethermapPlaceList.isEmpty()) {
                result.add(new TogethermapResponse(map, null,true));
            }
            else {
                for(TogethermapPlace togethermapPlace : togethermapPlaceList) {
                    result.add(findOne(togethermapPlace.getId(),true));
                }

            }
        }
        return result;
    }
}
