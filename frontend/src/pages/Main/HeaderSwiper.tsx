import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { UseQueryResult } from "react-query";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import Question from "./Question";

interface HeaderSwiperProps {
  data: UseQueryResult<ITogetherMap[], unknown>;
}

function HeaderSwiper({ data }: HeaderSwiperProps) {
  return (
    <Swiper
      slidesPerView={1}
      loop
      pagination={{
        clickable: true,
      }}
      effect="fade"
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      speed={800}
      modules={[Pagination, Autoplay, EffectFade]}
      className="mySwiper"
    >
      {data.isSuccess &&
        data.data?.map((item) => (
          <SwiperSlide key={item.togethermapId}>
            <Question item={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default HeaderSwiper;
