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
@Table(name="review")
public class Review extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="place_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Place place;

    @Column(nullable = false)
    private int emojiType;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public Review update(Place place, int emojiType, String content){
        this.place = place;
        this.emojiType = emojiType;
        this.content = content;
        return this;
    }

    @Builder
    public Review(Place place, int emojiType, String content, User user){
        this.place = place;
        this.emojiType = emojiType;
        this.content = content;
        this.user = user;
    }
}
