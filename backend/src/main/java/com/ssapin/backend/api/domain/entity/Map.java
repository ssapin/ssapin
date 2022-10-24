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
@Table(name="map")
public class Map extends BaseEntity {
    @Column(nullable = false)
    private long campusId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private boolean access;

    @Column(nullable = false)
    private long userId;

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
    public Map(long campusId, String title, boolean access, long userId, String emoji){
        this.campusId=campusId;
        this.title=title;
        this.access=access;
        this.userId=userId;
        this.emoji=emoji;
    }
}
