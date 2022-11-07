package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceBookmarkRepository extends JpaRepository<PlaceBookmark, Long> {

    public List<PlaceBookmark> findAllByUserId(long userId);
}
