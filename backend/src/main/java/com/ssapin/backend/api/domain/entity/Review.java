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
@Table(name="review")
public class Review extends BaseEntity {
    @Column(nullable = false)
    private long placeId;

    @Column(nullable = false)
    private int emojiType;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private long userId;

    public Review update(long placeId, int emojiType, String content){
        this.placeId = placeId;
        this.emojiType = emojiType;
        this.content = content;
        return this;
    }

    @Builder
    public Review(long placeId, int emojiType, String content, long userId){
        this.placeId = placeId;
        this.emojiType = emojiType;
        this.content = content;
        this.userId = userId;
    }
}
