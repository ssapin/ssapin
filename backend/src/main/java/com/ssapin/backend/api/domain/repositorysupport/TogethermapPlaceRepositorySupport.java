package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TogethermapPlaceRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TogethermapPlaceRepositorySupport(JPAQueryFactory queryFactory) {
        super(TogethermapPlace.class);
        this.queryFactory = queryFactory;
    }

    public List<TogethermapPlace> findByTogethermap(Togethermap togethermap) {
        return queryFactory.selectFrom(QTogethermapPlace.togethermapPlace)
                .where(QTogethermapPlace.togethermapPlace.togethermap.eq(togethermap))
                .fetch();
    }

    public long countTogethermapPlaceByUserId(long userId) {

        return queryFactory
                .select(QTogethermapPlace.togethermapPlace.count())
                .from(QTogethermapPlace.togethermapPlace)
                .where(QTogethermapPlace.togethermapPlace.user.id.eq(userId))
                .fetchOne();
    }

    public long countParticipationByUserId(long userId) {

        return queryFactory
                .select(QTogethermapPlace.togethermapPlace.togethermap.id.countDistinct())
                .from(QTogethermapPlace.togethermapPlace)
                .where(QTogethermapPlace.togethermapPlace.user.id.eq(userId))
                .fetchOne();
    }
}
