import axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { cookie } from "../functions/cookie";
// eslint-disable-next-line import/no-cycle
import { getNewAccessToken } from "./userApis";

type CustomResponseFormat<T = any> = {
  response: T;
};
interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<CustomResponseFormat>>;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  // get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  // delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  // post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  // put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  // patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const axiosInstance: CustomInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    "Accept-Encoding": "gzip",
  },
  withCredentials: true,
});

export default axiosInstance;

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

interface IErrorResponse {
  message: string;
}

const onResponseError = async (
  error: AxiosError<IErrorResponse>,
  // eslint-disable-next-line consistent-return
): Promise<AxiosError> => {
  const originalConfig = error.config;
  const { response } = error;
  if (response) {
    if (response.status === 401 && response.data?.message === "Token Expired") {
      try {
        const res: AxiosResponse = await getNewAccessToken();
        const { accessToken } = res.data;
        cookie.set("accessToken", accessToken);
        axiosInstance.defaults.headers.access_token = accessToken;
        return await axiosInstance(originalConfig);
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response.status === 403) {
            cookie.remove("accessToken");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        }
      }
    } else if (response.status === 403) {
      cookie.remove("accessToken");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else return Promise.reject(error);
  } else return Promise.reject(error);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookie.get("accessToken");
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.accessToken = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(onResponse, onResponseError);
