import { AxiosResponse } from "axios";
import { IMap } from "../types/map.interface";
import axiosInstance from "./api";

export const MAP_APIS = {
  MAP: "/map/login",
  BOOKMARK: "/map/login/bookmark",
  getMap: (mapId: number) => `/map/${mapId}/detail`,
  getMapList: (
    campusId: number,
    page?: number,
    hashtagList?: number[],
    keyword?: string,
  ) => {
    let api: string = `/map?campusId=${campusId}`;
    if (page) {
      api += `&page=${page}`;
    }
    if (keyword && keyword != null && keyword !== "") {
      api += `&keyword=${keyword}`;
    }
    let str: string = "&hashtagList=";
    if (hashtagList) {
      const { length } = hashtagList;
      if (length !== 0) {
        hashtagList.forEach((hashtag) => {
          str += hashtag.toString();
          str += ",";
        });
      }
    }
    str = str.substring(0, str.length - 1);
    api += str;
    return api;
  },
  GET_MAP_RANKING: (campusId: number) => `/map/${campusId}/ranking`,
};

export const getMap = async (mapId: number) => {
  try {
    const response: AxiosResponse<IMap> = await axiosInstance.get(
      MAP_APIS.getMap(mapId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
