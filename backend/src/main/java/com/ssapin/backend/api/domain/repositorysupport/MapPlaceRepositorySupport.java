package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
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

    public MapPlace findByMapPlace(Map map, User user, Place place) {
        return queryFactory.selectFrom(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.map.id.eq(map.getId())
                        .and(QMapPlace.mapPlace.place.id.eq(place.getId()))
                        .and(QMapPlace.mapPlace.user.id.eq(user.getId())))
                .fetchOne();
    }

    private BooleanExpression campusEq(Campus campus) {
        if (campus == null) {
            return null;
        }
        return QMap.map.campus.id.eq(campus.getId());
    }

    public List<MapPlace> findbyPlace(long placeId)
    {
        return queryFactory.select(QMapPlace.mapPlace)
            .from(QMapPlace.mapPlace).where(QMapPlace.mapPlace.place.id.eq(placeId)).fetch();
    }

}
