import { AxiosResponse } from "axios";
import { IPlaceDetail } from "../types/place.interface";
import axiosInstance from "./api";

const PLACE_APIS = {
  getPlaceRanking: (campusId: number) => `/place/ranking/${campusId}`,
  getDetailPlaceInfo: (placeId: number) => `/place/${placeId}/detail`,
  getMapListInPlace: (placeId: number) => `/place/map/${placeId}`,
  MAP: `/place/login/map`,
  TOGETHERMAP: `/place/login/togethermap`,
  BOOKMARK: `/place/login/bookmark`,
};

export default PLACE_APIS;

export const getPlaceInfo = async (placeId: number) => {
  try {
    const response: AxiosResponse<IPlaceDetail> = await axiosInstance.get(
      PLACE_APIS.getDetailPlaceInfo(placeId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
