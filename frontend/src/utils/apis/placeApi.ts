import { AxiosResponse } from "axios";
import { IPlaceDetail, IPlaceRanking } from "../types/place.interface";
import axiosInstance from "./api";

const PLACE_APIS = {
  PLACE_RANKING: (campusId: number) => `/place/ranking/${campusId}`,
  DETAIL_PLACE_INFO: (placeId: number) => `/place/${placeId}/detail`,
  MAP_LIST_IN_PLACE: (placeId: number) => `/place/map/${placeId}`,
  MAP: `/place/login/map`,
  TOGETHERMAP: `/place/login/togethermap`,
  BOOKMARK: `/place/login/bookmark`,
};

export default PLACE_APIS;

export const getPlaceInfo = async (placeId: number) => {
  try {
    const response: AxiosResponse<IPlaceDetail> = await axiosInstance.get(
      PLACE_APIS.DETAIL_PLACE_INFO(placeId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPlaceRanking = async (campusId: number) => {
  try {
    const response: AxiosResponse<IPlaceRanking> = await axiosInstance.get(
      PLACE_APIS.PLACE_RANKING(campusId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
