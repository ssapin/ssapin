package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssapin.backend.api.domain.entity.*;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MapBookmarkRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapBookmarkRepositorySupport(JPAQueryFactory queryFactory) {
        super(MapBookmark.class);
        this.queryFactory = queryFactory;
    }

    public MapBookmark findByMapBookmark(Map map, User user) {
        return queryFactory.selectFrom(QMapBookmark.mapBookmark)
                .where(QMapBookmark.mapBookmark.map.eq(map).and(
                        QMapBookmark.mapBookmark.user.eq(user)
                ))
                .fetchOne();
    }

    public List<MapBookmark> findByUserId(long userId) {
        return queryFactory
                .selectFrom(QMapBookmark.mapBookmark)
                .leftJoin(QMapBookmark.mapBookmark.map, QMap.map)
                .fetchJoin()
                .leftJoin(QMap.map.user, QUser.user)
                .fetchJoin()
                .where(QMapBookmark.mapBookmark.user.id.eq(userId))
                .orderBy(QMapBookmark.mapBookmark.id.desc())
                .fetch();
    }

    public long countMapBookmarkByMapId(long mapId) {
        return queryFactory
                .select(QMapBookmark.mapBookmark.count())
                .from(QMapBookmark.mapBookmark)
                .where(QMapBookmark.mapBookmark.map.id.eq(mapId))
                .fetchOne();
    }
}
