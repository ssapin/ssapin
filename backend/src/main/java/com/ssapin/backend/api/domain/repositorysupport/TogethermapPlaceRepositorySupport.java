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

    public TogethermapPlace findByPlace(Togethermap togethermap, User user, Place place)
    {
        return queryFactory.selectFrom(QTogethermapPlace.togethermapPlace)
                .where(QTogethermapPlace.togethermapPlace.togethermap.eq(togethermap)
                .and(QTogethermapPlace.togethermapPlace.place.eq(place))
                .and(QTogethermapPlace.togethermapPlace.user.eq(user)))
                .fetchOne();
    }
}
