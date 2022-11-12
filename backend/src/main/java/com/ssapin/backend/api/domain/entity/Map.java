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
    @ManyToOne
    @JoinColumn(name="campus_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Campus campus;

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

    public Map update(Campus campus, String title, boolean access, String emoji){
        if(!this.campus.equals(campus)) this.campus=campus;
        if(!this.title.equals(title)) this.title=title;
        if(this.access!=access) this.access=access;
        if(!this.emoji.equals(emoji)) this.emoji=emoji;
        return this;
    }

    @Builder
    public Map(Campus campus, String title, boolean access, User user, String emoji){
        this.campus=campus;
        this.title=title;
        this.access=access;
        this.user=user;
        this.emoji=emoji;
    }
}
