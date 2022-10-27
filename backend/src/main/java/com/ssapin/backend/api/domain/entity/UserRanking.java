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
@Table(name="user_ranking")
public class UserRanking extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private long mapCount;

    public UserRanking update(User user,long mapCount){
        this.user = user;
        this.mapCount = mapCount;
        return this;
    }

    @Builder
    public UserRanking(User user,long mapCount){
        this.user = user;
        this.mapCount =mapCount;
    }
}
