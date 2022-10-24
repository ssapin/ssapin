package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.MapBookmark;
import com.ssapin.backend.api.domain.entity.MapHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapBookmarkRepository extends JpaRepository<MapBookmark, Long> {
}
