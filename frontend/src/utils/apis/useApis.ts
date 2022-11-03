// eslint-disable-next-line import/no-cycle
import { AxiosResponse } from "axios";
// eslint-disable-next-line import/no-cycle
import axiosInstance from "./api";

const USER_APIS = {
  REDIRECT_URI: `${import.meta.env.VITE_BASE_URL}/auth/kakao/login`,
  LOGIN: "/auth/login",
  REISSUE: "/auth/reissue",
  USER_INFORMATION: "/user/login/info",
  getUserRanking: (campusId: number) => `/user/ranking/${campusId}`,
};

export const login = async (authorizeCode: string): Promise<AxiosResponse> => {
  const body = { authorizeCode };
  return axiosInstance.post(USER_APIS.LOGIN, body);
};

export const getUserInformation = async (): Promise<AxiosResponse> => {
  return axiosInstance.get(USER_APIS.USER_INFORMATION);
};
export const getNewAccessToken = async (): Promise<AxiosResponse> => {
  return axiosInstance.get(USER_APIS.REISSUE);
};

export default USER_APIS;
