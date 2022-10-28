package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MapRankingRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapRankingRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapRanking.class);
        this.queryFactory = queryFactory;
    }

    public List<Map> findAllByCampus(Campus campus) {
        return queryFactory.select(QMapRanking.mapRanking.map).from(QMapRanking.mapRanking)
                .where(QMapRanking.mapRanking.map.campus.eq(campus))
                .fetch();
    }

    public List<Map> findMapsByCampus(Campus campus) {
        return queryFactory.
                select(QMapPlace.mapPlace.map)
                .from(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.user.campus.eq(campus))
                .groupBy(QMapPlace.mapPlace.map.id)
                .orderBy(QMapPlace.mapPlace.place.count().desc())
                .limit(6)
                .fetch();
    }
}
