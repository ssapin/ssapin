package com.ssapin.backend.api.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Table(name = "auth")
@RequiredArgsConstructor
public class Auth extends BaseEntity{
    @Column
    private String refreshToken;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Auth(String refreshToken, User user) {
        this.refreshToken = refreshToken;
        this.user = user;
    }

    public void update(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
