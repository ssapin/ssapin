package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
                .fetch();
    }

    private BooleanExpression campusEq(Long campusId) {
        if (campusId==null) {
            return null;
        }
        return QReview.review.eq(campusId);
    }

    public Review findPopularPlaceBywPlace(Campus campus)
    {

        return qu
        return null;
    }
}
