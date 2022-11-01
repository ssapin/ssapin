package com.ssapin.backend.api.service;

import com.ssapin.backend.api.domain.dto.response.MapResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceResponse;
import com.ssapin.backend.api.domain.dto.response.RankingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService{


    @Override
    public Long addPlaceInMap() {
        return null;
    }

    @Override
    public Long addPlaceInTogetherMap() {
        return null;
    }

    @Override
    public List<RankingResponse> getListPlaceRanking() {
        return null;
    }

    @Override
    public Long removePlaceInMap() {
        return null;
    }

    @Override
    public Long removePlaceInTogetherMap() {
        return null;
    }

    @Override
    public PlaceResponse getPlaceInfo() {
        return null;
    }

    @Override
    public List<MapResponse> getMapListInPlace() {
        return null;
    }

    @Override
    public Long registerBookmark() {
        return null;
    }

    @Override
    public Long removeBookmark() {
        return null;
    }
}
