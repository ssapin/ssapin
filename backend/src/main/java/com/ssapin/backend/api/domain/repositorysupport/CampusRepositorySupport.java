package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.QCampus;
import com.ssapin.backend.api.domain.entity.QUser;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class CampusRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CampusRepositorySupport(JPAQueryFactory queryFactory) {
        super(Campus.class);
        this.queryFactory = queryFactory;
    }

    public Optional<Campus> findByCampusId(long campusId) {
        return Optional.of(
                queryFactory
                        .selectFrom(QCampus.campus)
                        .where(QCampus.campus.id.eq(campusId))
                        .fetchOne()
        );
    }
}
