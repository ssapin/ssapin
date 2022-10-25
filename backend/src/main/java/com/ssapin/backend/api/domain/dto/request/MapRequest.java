package com.ssapin.backend.api.domain.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class MapRequest {
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class MapRegister {
        private long campusId;
        private String title;
        private String emoji;
        private Boolean access;
        private List<HashtagRequest> hashtagList;

        public MapRegister(long campusId, String title, String emoji, Boolean access, List<HashtagRequest> hashtagList) {
            this.campusId = campusId;
            this.title = title;
            this.emoji = emoji;
            this.access = access;
            this.hashtagList = hashtagList;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class MapEdit {
        private long mapId;
        private long campusId;
        private String title;
        private String emoji;
        private Boolean access;
        private List<HashtagRequest> hashtagList;

        public MapEdit(long mapId, long campusId, String title, String emoji, Boolean access, List<HashtagRequest> hashtagList) {
            this.mapId = mapId;
            this.campusId = campusId;
            this.title = title;
            this.emoji = emoji;
            this.access = access;
            this.hashtagList = hashtagList;
        }
    }
}
