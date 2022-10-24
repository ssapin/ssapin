package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.Campus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class CampusRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public CampusRepositorySupport(JPAQueryFactory queryFactory) {
        super(Campus.class);
        this.queryFactory = queryFactory;
    }
}
