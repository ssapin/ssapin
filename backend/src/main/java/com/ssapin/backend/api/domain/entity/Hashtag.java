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
@Table(name="hashtag")
public class Hashtag extends BaseEntity {
    @Column(nullable = false)
    private String content;

    public Hashtag update(String content){
        this.content = content;
        return this;
    }

    @Builder
    public Hashtag(String content){
        this.content = content;
    }
}
