package com.ssapin.backend.api.domain.repository;

import com.ssapin.backend.api.domain.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long> {
}
