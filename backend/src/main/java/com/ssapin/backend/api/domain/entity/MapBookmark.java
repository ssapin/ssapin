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
@Table(name="map_bookmark")
public class MapBookmark extends BaseEntity {
    @Column(nullable = false)
    private long userId;

    @Column(nullable = false)
    private long mapId;

    public MapBookmark update(long userId, long mapId){
        this.userId = userId;
        this.mapId = mapId;
        return this;
    }

    @Builder
    public MapBookmark(long userId, long mapId){
        this.userId = userId;
        this.mapId = mapId;
    }
}
