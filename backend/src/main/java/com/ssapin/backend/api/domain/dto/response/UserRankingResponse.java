package com.ssapin.backend.api.domain.dto.response;

import com.ssapin.backend.api.domain.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class UserRankingResponse {
    private User user;
    private long mapCount;

    public UserRankingResponse(User user, long mapCount) {
        this.user = user;
        this.mapCount = mapCount;
    }
}
