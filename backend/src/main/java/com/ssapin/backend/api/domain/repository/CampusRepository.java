package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampusRepository extends JpaRepository<Campus, Long> {
}
