// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from "axios";
// eslint-disable-next-line import/no-cycle
import axiosInstance from "./api";
import { IUserNicknameCheck } from "../types/user.interface";

const USER_APIS = {
  REDIRECT_URI: `${import.meta.env.VITE_BASE_URL}/auth/kakao/login`,
  LOGIN: "/auth/login",
  REISSUE: "/auth/reissue",
  USER_INFORMATION: "/user/login/info",
  getUserRanking: (campusId: number) => `/user/ranking/${campusId}`,
  MY_MAP: "/user/login/map/mine",
  JOIN_MAP: "/user/login/map/join",
  BOOKMARK_MAP: "/user/login/map/bookmark",
  BOOKMARK_PLACE: "/user/login/place/bookmark",
  NICKNAME: `/user/check`,
};

export const getAccessToken = async (
  authorizeCode: string,
): Promise<AxiosResponse> => {
  const body = { authorizeCode };
  return axiosInstance.post(USER_APIS.LOGIN, body);
};

export const getUserInformation = async (): Promise<AxiosResponse> =>
  axiosInstance.get(USER_APIS.USER_INFORMATION);

export const getNewAccessToken = async (): Promise<AxiosResponse> =>
  axiosInstance.get(USER_APIS.REISSUE);

export const checkDuplicateUserNickname = async (
  data: IUserNicknameCheck,
): Promise<AxiosResponse> => {
  return axiosInstance.post(USER_APIS.NICKNAME, data);
};
export default USER_APIS;
