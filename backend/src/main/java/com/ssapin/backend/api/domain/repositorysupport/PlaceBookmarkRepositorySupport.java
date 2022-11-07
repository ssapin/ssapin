package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.QCampus;
import com.ssapin.backend.api.domain.entity.QPlaceBookmark;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    public PlaceMapResponse.PopularPlaceRankingResponse findPopularPlaceByBookmark(Campus campus){

        return queryFactory.select(Projections.bean(PlaceMapResponse.PopularPlaceRankingResponse.class,QMapPlace.mapPlace.place.id.as("placeId"),QMapPlace.mapPlace.place.id.count().as("cnt")))
                .from(QMapPlace.mapPlace)
                .join(QMap.map)
                .on(campusEq(campus))
                .join(QPlace.place)
                .on(QMapPlace.mapPlace.place.id.eq(QPlace.place.id))
                .join(QPlaceBookmark.placeBookmark)
                .on(QMapPlace.mapPlace.place.id.eq(QPlaceBookmark.placeBookmark.place.id))
                .groupBy(QMapPlace.mapPlace.place.id)
                .orderBy(QMapPlace.mapPlace.place.id.count().desc())
                . limit(1).fetchOne();
    }




    public List<PlaceBookmark> findByUserId(long userId) {
        return queryFactory
                .selectFrom(QPlaceBookmark.placeBookmark)
                .where(QPlaceBookmark.placeBookmark.user.id.eq(userId))
                .orderBy(QPlaceBookmark.placeBookmark.id.desc())
                .fetch();
    }
}
