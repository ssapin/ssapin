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
@Table(name="user")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private long campusId;

    @Column(nullable = false)
    private String emoji;

    public User update(String nickname, long compusId, String emoji){
        this.nickname = nickname;
        this.campusId = compusId;
        this.emoji = emoji;
        return this;
    }

    @Builder
    public User(String nickname, String token, long compusId, String emoji){
        this.nickname = nickname;
        this.token = token;
        this.campusId = compusId;
        this.emoji = emoji;
    }
}
