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
@Table(name="user_ranking")
public class UserRanking extends BaseEntity {
    @Column(nullable = false)
    private long userId;

    public UserRanking update(long userId){
        this.userId = userId;
        return this;
    }

    @Builder
    public UserRanking(long userId){
        this.userId = userId;
    }
}
