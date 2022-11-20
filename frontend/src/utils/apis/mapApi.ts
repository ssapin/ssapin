import { AxiosResponse } from "axios";
import { IMap, IMapObject } from "../types/map.interface";
import axiosInstance from "./api";

export const MAP_APIS = {
  MAP: "/map/login",
  BOOKMARK: "/map/login/bookmark",
  MAP_DETAIL: (mapId: number) => `/map/${mapId}/detail`,
  SEARCH_MAP_LIST: (
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
  MAP_RANKING: (campusId: number) => `/map/${campusId}/ranking`,
  MAIN_MAP_LIST: (campusId: number) =>
    `/map?page=0&size=6&campusId=${campusId}`,
};

export const getMap = async (mapId: number) => {
  try {
    const response: AxiosResponse<IMap> = await axiosInstance.get(
      MAP_APIS.MAP_DETAIL(mapId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export interface IBookMark {
  mapId: number;
}

export const getMapRanking = async (campusId: number) => {
  try {
    const response: AxiosResponse<IMap[]> = await axiosInstance.get(
      MAP_APIS.MAP_RANKING(campusId),
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMainMapList = async (campusId: number) => {
  try {
    const response: AxiosResponse<IMapObject> = await axiosInstance.get(
      MAP_APIS.MAIN_MAP_LIST(campusId),
    );
    return response.data.content;
  } catch (error) {
    return Promise.reject(error);
  }
};

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
