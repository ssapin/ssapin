import axiosInstance from "./api";

const USER_APIS = {
  REDIRECT_URI: `${import.meta.env.VITE_BASE_URL}/auth/kakao/login`,
  LOGIN: "/auth/login",
};

export const login = async (authorizeCode: string) => {
  const body = { authorizeCode };
  return axiosInstance.post(USER_APIS.LOGIN, body);
};

export default USER_APIS;
