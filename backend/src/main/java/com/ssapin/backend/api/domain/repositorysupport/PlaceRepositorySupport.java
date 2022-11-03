package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.Place;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class PlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public PlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(Place.class);
        this.queryFactory = queryFactory;
    }



}
