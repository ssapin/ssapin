package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.Place;
import com.ssapin.backend.api.domain.entity.QPlace;
import com.ssapin.backend.api.domain.entity.QReview;
import com.ssapin.backend.api.domain.entity.Review;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public PlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(Place.class);
        this.queryFactory = queryFactory;
    }

//    public long findAllByUserId(long userId) {
//        return queryFactory
//                .select(QPlace.place.count())
//                .from(QPlace.place)
//                .where(QPlace.place)
//                .fetch();
//
//    }



}
