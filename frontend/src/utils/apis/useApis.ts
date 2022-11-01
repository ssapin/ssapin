import axiosInstance from "./api";

const USER_APIS = {
  REDIRECT_URI: `${import.meta.env.VITE_BASE_URL}/auth/kakao/login`,
  LOGIN: "/auth/login",
  USER_INFORMATION: "/user",
  REISSUE: "/auth/reissue",
};

export const login = async (authorizeCode: string) => {
  const body = { authorizeCode };
  return axiosInstance.post(USER_APIS.LOGIN, body);
};

export const getUserInformation = async () => {
  return axiosInstance.get(USER_APIS.USER_INFORMATION);
};
export const getNewAccessToken = async () => {
  return axiosInstance.get(USER_APIS.REISSUE);
};

export default USER_APIS;
