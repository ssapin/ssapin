package com.ssapin.backend.api.domain.repositorysupport;

import com.querydsl.core.BooleanBuilder;
import com.ssapin.backend.api.domain.dto.request.HashtagRequest;
import com.ssapin.backend.api.domain.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MapRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MapRepositorySupport(JPAQueryFactory queryFactory) {
        super(Map.class);
        this.queryFactory = queryFactory;
    }

    public List<Map> findAllByFiltering(Campus campus, List<Long> hashtagRequestList, String keyword) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(QMap.map.campus.eq(campus));

        if (hashtagRequestList!=null && !hashtagRequestList.isEmpty()) {
            for (Long request : hashtagRequestList) {
                Hashtag hashtag = queryFactory.selectFrom(QHashtag.hashtag)
                        .where(QHashtag.hashtag.id.eq(request))
                        .fetchFirst();
                builder.and(QMapHashtag.mapHashtag.hashtag.eq(hashtag));
            }
        }

        if (keyword!=null) {
            builder.and(QMap.map.title.containsIgnoreCase(keyword));
        }

        List<Map> result = queryFactory.select(QMapHashtag.mapHashtag.map)
                .from(QMapHashtag.mapHashtag)
                .rightJoin(QMapHashtag.mapHashtag.map, QMap.map)
                .where(builder)
                .orderBy(QMap.map.id.desc())
                .fetch();

        return result;
    }


}
