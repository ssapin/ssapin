import { AxiosResponse } from "axios";
import { ITogetherMap } from "../types/togethermap.interface";
import axiosInstance from "./api";

export const TOGETHERMAP_APIS = {
  GET_TOGETHERMAP_LIST: (campusId: number) => `/togethermap/${campusId}`,
  TOGETHERMAP: (togethermapId: number) =>
    `/togethermap/${togethermapId}/detail`,
};

export const getTogetherMap = async (togethermapId: number) => {
  try {
    const response: AxiosResponse<ITogetherMap> = await axiosInstance.get(
      TOGETHERMAP_APIS.TOGETHERMAP(togethermapId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
