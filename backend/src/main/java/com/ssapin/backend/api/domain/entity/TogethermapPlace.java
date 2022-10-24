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
@Table(name="togethermap_place")
public class TogethermapPlace extends BaseEntity {
    @Column(nullable = false)
    private long placeId;

    @Column(nullable = false)
    private long togethermapId;

    @Column(nullable = false)
    private long userId;

    public TogethermapPlace update(long placeId, long togethermapId){
        this.placeId=placeId;
        this.togethermapId=togethermapId;
        return this;
    }

    @Builder
    public TogethermapPlace(long placeId, long togethermapId, long userId){
        this.placeId=placeId;
        this.togethermapId=togethermapId;
        this.userId=userId;
    }
}
