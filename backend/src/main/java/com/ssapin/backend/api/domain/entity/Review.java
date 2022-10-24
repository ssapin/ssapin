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
    @Column(nullable = false)
    private long placeId;

    @Column(nullable = false)
    private int emojiType;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    public Review update(long placeId, int emojiType, String content){
        this.placeId = placeId;
        this.emojiType = emojiType;
        this.content = content;
        return this;
    }

    @Builder
    public Review(long placeId, int emojiType, String content, User user){
        this.placeId = placeId;
        this.emojiType = emojiType;
        this.content = content;
        this.user = user;
    }
}
