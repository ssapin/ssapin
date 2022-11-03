package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.PopularPlaceRankingResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

@Repository
public class PlaceBookmarkRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public PlaceBookmarkRepositorySupport(JPAQueryFactory queryFactory) {
        super(PlaceBookmark.class);
        this.queryFactory = queryFactory;
    }

    private BooleanExpression campusEq(Campus campus) {
        if (campus==null) {
            return null;
        }
        return QMap.map.campus.eq(campus);


    }

    public PopularPlaceRankingResponse findPopularPlaceByBookmark(Campus campus){

        return queryFactory.select(Projections.bean(PopularPlaceRankingResponse.class,QPlaceBookmark.placeBookmark.place.id,QPlaceBookmark.placeBookmark.place.id.count()))
                .from(QPlaceBookmark.placeBookmark,QMapPlace.mapPlace,QMap.map)
                .where(campusEq(campus),QMapPlace.mapPlace.place.eq(QPlaceBookmark.placeBookmark.place))
                .groupBy(QPlaceBookmark.placeBookmark.place.id)
                .orderBy(QPlaceBookmark.placeBookmark.place.id.count().desc())
                .fetchFirst();

    }



}
