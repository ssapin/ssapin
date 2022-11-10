package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.*;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.PlaceBookmark;
import com.ssapin.backend.api.domain.entity.QCampus;
import com.ssapin.backend.api.domain.entity.QPlaceBookmark;
import com.ssapin.backend.api.domain.dto.response.PlaceMapResponse;
import com.ssapin.backend.api.domain.entity.*;
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

    private BooleanExpression campusEq(Campus campus) {
        if (campus == null) {
            return null;
        }
        return QMap.map.campus.eq(campus);
    }

    public List<PlaceBookmark> findByUserId(long userId) {
        return queryFactory
                .selectFrom(QPlaceBookmark.placeBookmark)
                .leftJoin(QPlaceBookmark.placeBookmark.place, QPlace.place)
                .where(QPlaceBookmark.placeBookmark.user.id.eq(userId))
                .orderBy(QPlaceBookmark.placeBookmark.id.desc())
                .fetch();
    }

    public PlaceBookmark findByUserAndPlace(long userId, long placeId) {

        return queryFactory
                .selectFrom(QPlaceBookmark.placeBookmark)
                .where(QPlaceBookmark.placeBookmark.place.id.eq(placeId)
                        .and(QPlaceBookmark.placeBookmark.user.id.eq(userId)))
                .fetchOne();
    }
}
