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
@Table(name="user")
public class User extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private String token;

    @ManyToOne
    @JoinColumn(name="campus_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private Campus campus;

    @Column(nullable = false)
    private String emoji;

    public User update(String nickname, Campus campus, String emoji){
        this.nickname = nickname;
        this.campus = campus;
        this.emoji = emoji;
        return this;
    }

    @Builder
    public User(String nickname, String token, Campus campus, String emoji){
        this.nickname = nickname;
        this.token = token;
        this.campus = campus;
        this.emoji = emoji;
    }
}
