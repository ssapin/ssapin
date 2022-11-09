package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.ReviewQueryResponse;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public ReviewRepositorySupport(JPAQueryFactory queryFactory) {
        super(Review.class);
        this.queryFactory = queryFactory;
    }

    public List<Review> findAllByPlace(Place place) {
        return queryFactory.selectFrom(QReview.review)
                .where(QReview.review.place.eq(place))
                .orderBy(QReview.review.id.desc())
                .fetch();
    }

    //동적쿼리
    private BooleanExpression campusEq(Campus campus) {
        if (campus==null) {
            return null;
        }
        return QMap.map.campus.eq(campus);
    }

    public List<ReviewQueryResponse> findByBookmarkedPlace(BooleanBuilder builder) {

        return queryFactory
                .select(Projections.bean(ReviewQueryResponse.class,
                        QReview.review.place.id.as("placeId"),
                        QReview.review.content.as("content")))
                .from(QReview.review)
                .where(QReview.review.id.in(
                        JPAExpressions
                                .select(QReview.review.id.max())
                                .from(QReview.review)
                                .groupBy(QReview.review.place.id)
                                .having(builder)))
                .fetch();
    }

    public PlaceMapResponse.PopularPlaceRankingResponse findPopularPlaceByReview(Campus campus)
    {
        return queryFactory.select(Projections.bean(PlaceMapResponse.PopularPlaceRankingResponse.class,QMapPlace.mapPlace.place.id.as("placeId"),QMapPlace.mapPlace.place.id.count().as("cnt")))
                .from(QMapPlace.mapPlace)
                .join(QMap.map)
                .on(campusEq(campus))
                .join(QPlace.place)
                .on(QMapPlace.mapPlace.place.id.eq(QPlace.place.id))
                .join(QReview.review)
                .on(QMapPlace.mapPlace.place.id.eq(QReview.review.place.id))
                .groupBy(QMapPlace.mapPlace.place.id)
                .orderBy(QMapPlace.mapPlace.place.id.count().desc())
                . limit(1).fetchOne();
    }



}