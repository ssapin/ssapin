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
@Table(name="map_hashtag")
public class MapHashtag extends BaseEntity {
    @Column(nullable = false)
    private long hashtagId;

    @ManyToOne
    @JoinColumn(name="map_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Map map;

    public MapHashtag update(long hashtagId){
        this.hashtagId = hashtagId;
        return this;
    }

    @Builder
    public MapHashtag(long hashtagId, Map map){
        this.hashtagId = hashtagId;
        this.map = map;
    }
}
