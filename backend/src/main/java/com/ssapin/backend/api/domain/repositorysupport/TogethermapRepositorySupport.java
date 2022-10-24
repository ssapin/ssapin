package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.Togethermap;
import com.ssapin.backend.api.domain.entity.TogethermapPlace;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class TogethermapRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TogethermapRepositorySupport(JPAQueryFactory queryFactory) {
        super(Togethermap.class);
        this.queryFactory = queryFactory;
    }
}
