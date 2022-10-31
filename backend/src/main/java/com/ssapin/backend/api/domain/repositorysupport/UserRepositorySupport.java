package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.entity.QTogethermapPlace;
import com.ssapin.backend.api.domain.entity.QUser;
import com.ssapin.backend.api.domain.entity.Togethermap;
import com.ssapin.backend.api.domain.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public UserRepositorySupport(JPAQueryFactory queryFactory) {
        super(User.class);
        this.queryFactory = queryFactory;
    }

    public boolean existByKakaoId(long kakaoId) {
        return queryFactory
                .from(QUser.user)
                .where(QUser.user.kakaoId.eq(kakaoId))
                .select(QUser.user.kakaoId)
                .fetchFirst() != null;
    }

    public Optional<User> findByKakaoId(long kakaoId) {
        return Optional.of(
                queryFactory
                        .selectFrom(QUser.user)
                        .where(QUser.user.kakaoId.eq(kakaoId))
                        .fetchOne()
                );
    }
}
