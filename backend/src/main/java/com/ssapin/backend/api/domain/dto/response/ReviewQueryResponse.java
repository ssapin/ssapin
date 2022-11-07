package com.ssapin.backend.api.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewQueryResponse {
    long placeId;
    String content;
}
