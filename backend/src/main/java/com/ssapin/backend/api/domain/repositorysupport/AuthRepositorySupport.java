package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public class AuthRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public AuthRepositorySupport(JPAQueryFactory queryFactory) {
        super(Auth.class);
        this.queryFactory = queryFactory;
    }

    public boolean existByRefreshToken(String refreshToken) {
        return queryFactory
                .from(QAuth.auth)
                .where(QAuth.auth.refreshToken.eq(refreshToken))
                .select(QAuth.auth.refreshToken)
                .fetchFirst() != null;
    }
}
