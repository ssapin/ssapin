package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MapPlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapPlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapPlace.class);
        this.queryFactory = queryFactory;
    }

    public List<MapPlace> findByMap(Map map) {
        return queryFactory.selectFrom(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.map.eq(map))
                .fetch();
    }

    public long countMapPlaceByUserId(long userId) {

        return queryFactory
                .select(QMapPlace.mapPlace.count())
                .from(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.user.id.eq(userId))
                .fetchOne();
    }

    public long countMapPlaceByMapId(long mapId) {

        return queryFactory
                .select(QMapPlace.mapPlace.count())
                .from(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.map.id.eq(mapId))
                .fetchOne();
    }

    public long countParticipantByMapId(long mapId) {

        return queryFactory
                .select(QMapPlace.mapPlace.user.countDistinct())
                .from(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.map.id.eq(mapId))
                .fetchOne();
    }
    public long countParticipationByUserId(long userId) {

        return queryFactory
                .select(QMapPlace.mapPlace.map.id.countDistinct())
                .from(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.user.id.eq(userId)
                        .and(QMap.map.user.id.ne(userId)))
                .fetchOne();
    }

    public List<MapPlace> findParticipateMapsByUserId(long userId) {

        return queryFactory
                .select(QMapPlace.mapPlace)
                .from(QMapPlace.mapPlace)
                .leftJoin(QMapPlace.mapPlace.map, QMap.map)
                .fetchJoin()
                .leftJoin(QMap.map.user, QUser.user)
                .fetchJoin()
                .where(QMapPlace.mapPlace.user.id.eq(userId)
                        .and(QMapPlace.mapPlace.map.user.id.ne(userId)))
                .orderBy(QMapPlace.mapPlace.id.desc())
                .fetch();
    }
}
