/* eslint-disable @typescript-eslint/no-use-before-define */
import axios, { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../store/atom";

type Method = "get" | "post" | "put" | "patch" | "delete";

function useFetch() {
  const auth = useRecoilValue(authState);
  return {
    get: request("get"),
    post: request("post"),
    put: request("put"),
    patch: request("patch"),
    delete: request("delete"),
  };

  function request(method: Method) {
    return async (url: string, body?: any, option?: any) => {
      const requestOptions = {
        headers: authHeader(url),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
      }
      return axios[method](url, requestOptions).then(handleResponse);
    };
  }

  function authHeader(url: string) {
    const token = auth?.accessToken;
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn && isApiUrl) {
      return { acceeToken: token };
    }
    return {};
  }

  function handleResponse(response: AxiosResponse) {
    return response;
  }
}

export default useFetch;
