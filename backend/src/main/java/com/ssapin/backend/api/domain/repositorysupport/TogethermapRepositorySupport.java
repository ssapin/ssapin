package com.ssapin.backend.api.domain.repositorysupport;

import com.ssapin.backend.api.domain.dto.response.TogethermapResponse;
import com.ssapin.backend.api.domain.entity.Campus;
import com.ssapin.backend.api.domain.entity.QTogethermap;
import com.ssapin.backend.api.domain.entity.Togethermap;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class TogethermapRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TogethermapRepositorySupport(JPAQueryFactory queryFactory) {
        super(Togethermap.class);
        this.queryFactory = queryFactory;
    }

    public List<Togethermap> findByCampus(Campus campus) {
        return queryFactory.selectFrom(QTogethermap.togethermap)
                .where(QTogethermap.togethermap.campus.eq(campus))
                .fetch();
    }
}
