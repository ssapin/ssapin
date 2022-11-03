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

    public MapPlace findByMapPlace(Map map, User user, Place place)
    {
        return queryFactory.selectFrom(QMapPlace.mapPlace)
                .where(QMapPlace.mapPlace.map.eq(map)
                        .and(QMapPlace.mapPlace.place.eq(place))
                        .and(QMapPlace.mapPlace.user.eq(user)))
                .fetchOne();
    }

    private BooleanExpression campusEq(Campus campus) {
        if (campus==null) {
            return null;
        }
        return QMap.map.campus.eq(campus);



    }

    public PlaceMapResponse.PopularPlaceRankingResponse findPopularPlaceByMap(Campus campus){

        return queryFactory.select(Projections.bean(PlaceMapResponse.PopularPlaceRankingResponse.class,QMapPlace.mapPlace.place.id,QMapPlace.mapPlace.place.id.count()))
                .from(QMapPlace.mapPlace,QMap.map)
                .where(campusEq(campus))
                .groupBy(QMapPlace.mapPlace.place.id)
                .orderBy(QMapPlace.mapPlace.place.id.count().desc())
                .fetchFirst();

    }

}
