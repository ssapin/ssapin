package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Hashtag;
import com.ssapin.backend.api.domain.entity.MapBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
}
