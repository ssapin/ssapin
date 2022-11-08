package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.UserRankingResponse;
import com.ssapin.backend.api.domain.dto.response.UserResponse;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRankingRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public UserRankingRepositorySupport(JPAQueryFactory queryFactory) {
        super(UserRanking.class);
        this.queryFactory = queryFactory;
    }
    public List<UserRankingResponse> findUsersByCampus(Campus campus) {
        return queryFactory.
                select(Projections.bean(UserRankingResponse.class, QMap.map.user,QMap.map.id.count().as("mapCount")))
                .from(QMap.map)
                .join(QMap.map.user, QUser.user)
                .where(QUser.user.campus.eq(campus))
                .groupBy(QUser.user.id)
                .orderBy(QMap.map.id.count().desc())
                .limit(5)
                .fetch();
    }

    public List<UserResponse.UserRanking> findUserRankingsByCampusId(long campusId) {

        return queryFactory
                .select(Projections.bean(UserResponse.UserRanking.class,
                        QUserRanking.userRanking.user.id.as("userId"),
                        QUserRanking.userRanking.user.nickname.as("nickname"),
                        QUserRanking.userRanking.user.emoji.as("emoji"),
                        QUserRanking.userRanking.mapCount.as("mapCount")))
                .from(QUserRanking.userRanking)
                .where(QUserRanking.userRanking.user.campus.id.eq(campusId))
                .limit(5)
                .fetch();
    }
}
