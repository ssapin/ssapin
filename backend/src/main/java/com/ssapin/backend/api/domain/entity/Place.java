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
@Table(name="place")
public class Place extends BaseEntity {
    @Column(nullable = false)
    private long itemId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private double lat;

    @Column(nullable = false)
    private double lng;

    @Column(nullable = false)
    private String address;

    public Place update(long itemId, String title, double lat, double lng, String address){
        this.itemId=itemId;
        this.title=title;
        this.lat=lat;
        this.lng=lng;
        this.address=address;
        return this;
    }

    @Builder
    public Place(long itemId, String title, double lat, double lng, String address){
        this.itemId=itemId;
        this.title=title;
        this.lat=lat;
        this.lng=lng;
        this.address=address;
    }
}
