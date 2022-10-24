package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.MapBookmark;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class MapBookmarkRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapBookmarkRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapBookmark.class);
        this.queryFactory = queryFactory;
    }
}
