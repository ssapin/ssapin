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
    @ManyToOne
    @JoinColumn(name="map_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Map map;

    @ManyToOne
    @JoinColumn(name="place_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public MapPlace update(Map map, Place place){
        this.map = map;
        this.place = place;
        return this;
    }

    @Builder
    public MapPlace(Map map, Place place, User user){
        this.map = map;
        this.place = place;
        this.user = user;
    }
}
