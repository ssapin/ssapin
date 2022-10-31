package com.ssapin.backend.api.domain.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashtagRequest implements Comparable<HashtagRequest> {
    private long hashtagId;

    public HashtagRequest(long hashtagId) {
        this.hashtagId = hashtagId;
    }

    @Override
    public int compareTo(HashtagRequest o) {
        return (int) (this.hashtagId-o.hashtagId);
    }
}
