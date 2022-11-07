package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MapRepository extends JpaRepository<Map, Long> {

    Optional<List<Map>> findByCampus(Campus campus);
}
