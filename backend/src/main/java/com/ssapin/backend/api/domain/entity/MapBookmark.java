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

    @Column(nullable = false)
    private long mapId;

    public MapBookmark update(long mapId){
        this.mapId = mapId;
        return this;
    }

    @Builder
    public MapBookmark(User user, long mapId){
        this.user = user;
        this.mapId = mapId;
    }
}
