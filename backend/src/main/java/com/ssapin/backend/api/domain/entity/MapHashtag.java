package com.ssapin.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@Table(name="map_hashtag")
public class MapHashtag extends BaseEntity {
    @Column(nullable = false)
    private long hashtagId;

    @Column(nullable = false)
    private long mapId;

    public MapHashtag update(long hashtagId){
        this.hashtagId = hashtagId;
        return this;
    }

    @Builder
    public MapHashtag(long hashtagId, long mapId){
        this.hashtagId = hashtagId;
        this.mapId = mapId;
    }
}
