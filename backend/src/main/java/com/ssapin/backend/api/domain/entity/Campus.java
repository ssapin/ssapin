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
@Table(name="campus")
public class Campus extends BaseEntity {
    @Column(nullable = false)
    private String region;

    public Campus update(String region){
        this.region=region;
        return this;
    }

    @Builder
    public Campus(String region){
        this.region=region;
    }
}
