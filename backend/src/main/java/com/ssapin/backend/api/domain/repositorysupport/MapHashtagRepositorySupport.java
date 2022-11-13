package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MapHashtagRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapHashtagRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapHashtag.class);
        this.queryFactory = queryFactory;
    }

    public List<MapHashtag> findAllByMap(Map map) {
        return queryFactory.selectFrom(QMapHashtag.mapHashtag)
                .where(QMapHashtag.mapHashtag.map.eq(map))
                .fetch();
    }

    public MapHashtag findByMapAndHashtag(Map map, Hashtag hashtag) {
        return queryFactory.selectFrom(QMapHashtag.mapHashtag)
                .where(QMapHashtag.mapHashtag.map.eq(map).and(QMapHashtag.mapHashtag.hashtag.eq(hashtag)))
                .fetchFirst();
    }
}
