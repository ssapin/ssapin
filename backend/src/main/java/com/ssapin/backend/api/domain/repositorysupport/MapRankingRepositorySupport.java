package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.MapPlace;
import com.ssapin.backend.api.domain.entity.MapRanking;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class MapRankingRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapRankingRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapRanking.class);
        this.queryFactory = queryFactory;
    }
}
