package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.dto.response.UserRankingResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.QMap;
import com.ssapin.backend.api.domain.entity.QUser;
import com.ssapin.backend.api.domain.entity.UserRanking;
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

}
