package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.MapHashtag;
import com.ssapin.backend.api.domain.entity.MapPlace;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class MapPlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapPlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapPlace.class);
        this.queryFactory = queryFactory;
    }
}
