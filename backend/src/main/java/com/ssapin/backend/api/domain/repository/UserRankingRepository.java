package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.UserRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRankingRepository extends JpaRepository<UserRanking, Long> {
}
