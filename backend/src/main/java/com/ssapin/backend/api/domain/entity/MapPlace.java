package com.ssapin.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public MapPlace update(long mapId, long placeId){
        this.mapId = mapId;
        this.placeId = placeId;
        return this;
    }

    @Builder
    public MapPlace(long mapId, long placeId, User user){
        this.mapId = mapId;
        this.placeId = placeId;
        this.user = user;
    }
}
