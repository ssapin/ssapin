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
    @ManyToOne
    @JoinColumn(name="hashtag_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Hashtag hashtag;

    @ManyToOne
    @JoinColumn(name="map_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Map map;

    public MapHashtag update(Hashtag hashtag){
        this.hashtag = hashtag;
        return this;
    }

    @Builder
    public MapHashtag(Hashtag hashtag, Map map){
        this.hashtag = hashtag;
        this.map = map;
    }
}
