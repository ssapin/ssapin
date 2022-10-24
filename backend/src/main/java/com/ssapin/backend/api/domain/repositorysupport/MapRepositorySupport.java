package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.Map;
import com.ssapin.backend.api.domain.entity.MapRanking;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class MapRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapRepositorySupport(JPAQueryFactory queryFactory) {
        super(Map.class);
        this.queryFactory = queryFactory;
    }
}
