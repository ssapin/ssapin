package com.ssapin.backend.api.domain.dto.response;

import lombok.Getter;

@Getter
public class RankingResponse {

   private long placeId;
   private long itemId;
   private String title;
   private long lat;
   private long lng;
   private String address;

   public RankingResponse(long placeId, long itemId, String title, long lat, long
                          lng, String address)
   {
       this.placeId=placeId;
       this.itemId = itemId;
       this.title =title;
       this.lat =lat;
       this.lng = lng;
       this.address=address;
   }

}
