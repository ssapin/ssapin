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
@Table(name="place_bookmark")
public class PlaceBookmark extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private long placeId;

    public PlaceBookmark update(long placeId){
        this.placeId = placeId;
        return this;
    }

    @Builder
    public PlaceBookmark(User user, long placeId){
        this.user = user;
        this.placeId = placeId;
    }
}
