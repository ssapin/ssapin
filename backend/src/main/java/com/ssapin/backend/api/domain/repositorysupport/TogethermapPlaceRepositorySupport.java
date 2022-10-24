package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class TogethermapPlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TogethermapPlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(TogethermapPlace.class);
        this.queryFactory = queryFactory;
    }

    public List<TogethermapPlace> findByTogethermap(Togethermap togethermap) {
        return queryFactory.selectFrom(QTogethermapPlace.togethermapPlace)
                .where(QTogethermapPlace.togethermapPlace.togethermap.eq(togethermap))
                .fetch();
    }
}
