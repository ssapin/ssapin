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
  get_maplist_mainpage: (campusId: number) =>
    `/map?page=0&size=6&campusId=${campusId}`,
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
export interface IBookMark {
  mapId: number;
}

export const registerMapBookmark = async (data: IBookMark) => {
  try {
    const response: AxiosResponse<IMap> = await axiosInstance.post(
      MAP_APIS.BOOKMARK,
      data,
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeMapBookmark = async (rData: IBookMark) => {
  try {
    const response: AxiosResponse<IMap> = await axiosInstance.delete(
      MAP_APIS.BOOKMARK,
      { data: rData },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
