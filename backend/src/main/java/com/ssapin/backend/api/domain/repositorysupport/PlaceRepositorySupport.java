package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class PlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public PlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(Place.class);
        this.queryFactory = queryFactory;
    }
}
