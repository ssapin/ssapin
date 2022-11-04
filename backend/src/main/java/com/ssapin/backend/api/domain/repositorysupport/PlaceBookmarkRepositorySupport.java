package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
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

    public List<PlaceBookmark> findByUserId(long userId) {
        return queryFactory
                .selectFrom(QPlaceBookmark.placeBookmark)
                .leftJoin(QPlaceBookmark.placeBookmark.place, QPlace.place)
                .fetchJoin()
                .where(QPlaceBookmark.placeBookmark.user.id.eq(userId))
                .orderBy(QPlaceBookmark.placeBookmark.id.desc())
                .fetch();
    }
}
