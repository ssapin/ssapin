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
@Table(name="map")
public class Map extends BaseEntity {
    @Column(nullable = false)
    private long campusId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private boolean access;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;

    @Column(nullable = false)
    private String emoji;

    public Map update(long campusId, String title, boolean access, String emoji){
        this.campusId=campusId;
        this.title=title;
        this.access=access;
        this.emoji=emoji;
        return this;
    }

    @Builder
    public Map(long campusId, String title, boolean access, User user, String emoji){
        this.campusId=campusId;
        this.title=title;
        this.access=access;
        this.user=user;
        this.emoji=emoji;
    }
}
