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
@Table(name="place_bookmark")
public class PlaceBookmark extends BaseEntity {
    @Column(nullable = false)
    private long userId;

    @Column(nullable = false)
    private long placeId;

    public PlaceBookmark update(long userId, long placeId){
        this.userId = userId;
        this.placeId = placeId;
        return this;
    }

    @Builder
    public PlaceBookmark(long userId, long placeId){

        this.userId = userId;
        this.placeId = placeId;
    }
}
