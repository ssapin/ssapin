package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

    public Place findPopularPlaceByBookmark(Campus campus){

        return queryFactory.select(QPlaceBookmark.review.place).from(QPlaceBookmark.review,QMapPlace.mapPlace,QMap.map)
                .where(campusEq(campus),QMap.map.id.eq(QMapPlace.mapPlace.map.id),QMapPlace.mapPlace.place.eq(QPlaceBookmark.review.place))
                .fetchFirst();

    }



}
