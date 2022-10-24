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
@Table(name="map_ranking")
public class MapRanking extends BaseEntity {
    @Column(nullable = false)
    private long mapId;

    public MapRanking update(long mapId){
        this.mapId = mapId;
        return this;
    }

    @Builder
    public MapRanking(long mapId){
        this.mapId = mapId;
    }
}
