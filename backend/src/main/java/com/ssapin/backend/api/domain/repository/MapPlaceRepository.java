package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.MapPlace;
import com.ssapin.backend.api.domain.entity.MapRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapPlaceRepository extends JpaRepository<MapPlace, Long> {





}
