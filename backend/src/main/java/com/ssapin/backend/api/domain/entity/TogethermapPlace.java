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
    @Column(nullable = false)
    private long placeId;

    @Column(nullable = false)
    private long togethermapId;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public TogethermapPlace update(long placeId, long togethermapId){
        this.placeId=placeId;
        this.togethermapId=togethermapId;
        return this;
    }

    @Builder
    public TogethermapPlace(long placeId, long togethermapId, User user){
        this.placeId=placeId;
        this.togethermapId=togethermapId;
        this.user=user;
    }
}
