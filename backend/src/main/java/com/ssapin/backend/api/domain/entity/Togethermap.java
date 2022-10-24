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
@Table(name="togethermap")
public class Togethermap extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @ManyToOne
    @JoinColumn(name="campus_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Campus campus;

    public Togethermap update(String title, Campus campus){
        this.title=title;
        this.campus=campus;
        return this;
    }

    @Builder
    public Togethermap(String title, Campus campus){
        this.title=title;
        this.campus=campus;
    }
}
