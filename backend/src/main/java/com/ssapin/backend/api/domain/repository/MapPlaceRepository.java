package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.MapPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MapPlaceRepository extends JpaRepository<MapPlace, Long> {


    List<MapPlace> findByPlace(long placeId);



}
