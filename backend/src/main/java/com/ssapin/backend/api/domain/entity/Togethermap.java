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
@Table(name="togethermap")
public class Togethermap extends BaseEntity {
    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private long campusId;

    public Togethermap update(String title, long campusId){
        this.title=title;
        this.campusId=campusId;
        return this;
    }

    @Builder
    public Togethermap(String title, long campusId){
        this.title=title;
        this.campusId=campusId;
    }
}
