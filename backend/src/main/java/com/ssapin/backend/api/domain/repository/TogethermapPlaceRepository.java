package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.Togethermap;
import com.ssapin.backend.api.domain.entity.TogethermapPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TogethermapPlaceRepository extends JpaRepository<TogethermapPlace, Long> {
    boolean existsByTogethermapAndPlace(Togethermap togethermap, Place place);
}
