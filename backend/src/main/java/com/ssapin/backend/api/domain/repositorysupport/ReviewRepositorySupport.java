package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.ReviewResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.Max;
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

    public Map<Integer, String> findByBookmarkedPlace(BooleanBuilder builder) {

        return queryFactory.select(Projections.bean(Map.class))
                .from(QReview.review)
                .where(QReview.review.id.in(
                        JPAExpressions
                                .select(QReview.review.id.max())
                                .from(QReview.review)
                                .groupBy(QReview.review.place.id)
                                .having(builder)))
                .fetch();
    }
}
