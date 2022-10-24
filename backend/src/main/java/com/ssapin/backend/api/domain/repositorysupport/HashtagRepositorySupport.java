package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.Hashtag;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class HashtagRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public HashtagRepositorySupport(JPAQueryFactory queryFactory) {
        super(Hashtag.class);
        this.queryFactory = queryFactory;
    }
}
