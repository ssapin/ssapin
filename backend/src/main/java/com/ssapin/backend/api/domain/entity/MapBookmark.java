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
@Table(name="map_bookmark")
public class MapBookmark extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name="map_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Map map;

    public MapBookmark update(Map map){
        this.map = map;
        return this;
    }

    @Builder
    public MapBookmark(User user, Map map){
        this.user = user;
        this.map = map;
    }
}
