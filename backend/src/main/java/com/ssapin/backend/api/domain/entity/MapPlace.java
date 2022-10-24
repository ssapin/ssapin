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
@Table(name="map_place")
public class MapPlace extends BaseEntity {
    @Column(nullable = false)
    private long mapId;

    @Column(nullable = false)
    private long placeId;

    @Column(nullable = false)
    private long userId;

    public MapPlace update(long mapId, long placeId){
        this.mapId = mapId;
        this.placeId = placeId;
        return this;
    }

    @Builder
    public MapPlace(long mapId, long placeId, long userId){
        this.mapId = mapId;
        this.placeId = placeId;
        this.userId = userId;
    }
}
