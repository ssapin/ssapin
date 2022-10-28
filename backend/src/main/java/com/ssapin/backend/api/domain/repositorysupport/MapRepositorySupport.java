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

    public List<Map> findAllByFiltering(Campus campus, List<HashtagRequest> hashtagRequestList, String keyword) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(QMap.map.campus.eq(campus));

        if (!hashtagRequestList.isEmpty()) {
            for (HashtagRequest request : hashtagRequestList) {
                Hashtag hashtag = (Hashtag) queryFactory.selectOne().from(QHashtag.hashtag)
                        .where(QHashtag.hashtag.id.eq(request.getHashtagId()))
                        .fetch();
                builder.and(QMapHashtag.mapHashtag.hashtag.eq(hashtag));
            }
        }

        if (!(keyword.equals("") || keyword.isEmpty() || keyword.equals(null))) {
            builder.and(QMap.map.title.containsIgnoreCase(keyword));
        }

        List<Map> result = queryFactory.selectFrom(QMap.map)
                .join(QMap.map, QMapHashtag.mapHashtag.map)
                .where(builder)
                .orderBy(QMap.map.id.desc())
                .fetch();

        return result;
    }


}
