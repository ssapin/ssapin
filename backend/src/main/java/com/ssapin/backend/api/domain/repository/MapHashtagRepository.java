package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.MapHashtag;
import com.ssapin.backend.api.domain.entity.MapPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapHashtagRepository extends JpaRepository<MapHashtag, Long> {
}
