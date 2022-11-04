// 공통 타입 지정 폴더

import { ReactNode } from "react";

export type Props = {};

export interface Children {
  children: ReactNode;
}

export interface KakaoPlaceObj {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
