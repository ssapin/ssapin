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
@Table(name="togethermap_place")
public class TogethermapPlace extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="place_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @ManyToOne
    @JoinColumn(name="togethermap_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Togethermap togethermap;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public TogethermapPlace update(Place place, Togethermap togethermap){
        this.place=place;
        this.togethermap=togethermap;
        return this;
    }

    @Builder
    public TogethermapPlace(Place place, Togethermap togethermap, User user){
        this.place=place;
        this.togethermap=togethermap;
        this.user=user;
    }
}
