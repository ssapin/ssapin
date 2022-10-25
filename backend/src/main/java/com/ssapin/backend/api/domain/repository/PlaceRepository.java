package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
}
