/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState, campusState, userInformationState } from "../../store/atom";
import { getAccessToken, getUserInformation } from "../apis/userApis";
import { cookie } from "../functions/cookie";

function useUserActions() {
  const [searchParams] = useSearchParams();
  const setAuth = useSetRecoilState(authState);
  const setUser = useSetRecoilState(userInformationState);
  const setCampus = useSetRecoilState(campusState);
  const navigate = useNavigate();
  const useGetUser = useGetUserInformation();

  return { login, logout };

  async function login() {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return navigate("-1");
    try {
      const response = await getAccessToken(kakaoCode);
      const { data } = response;

      if (data?.accessToken) {
        const option = {
          path: "/",
          secure: true,
          sameSite: true,
        };
        cookie.set("accessToken", data?.accessToken, option);
        setAuth({
          accessToken: data?.accessToken,
          firstLogin: data?.firstLogin,
        });
        await useGetUser.getUser();
        if (data?.firstLogin) {
          console.log(data?.firstLogin);
          navigate("/mypage");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function logout() {
    cookie.remove("accessToken", { path: "/" });
    setUser({
      campusId: 0,
      nickname: "",
      emoji: "",
      userId: 0,
      mapCnt: 0,
      placeCnt: 0,
      participateCnt: 0,
    });
    setCampus(1);
    setAuth({ accessToken: "", firstLogin: false });
    navigate("/");
  }
}

export default useUserActions;

export function useGetUserInformation() {
  const setUser = useSetRecoilState(userInformationState);
  const setCampus = useSetRecoilState(campusState);
  return { getUser };

  async function getUser() {
    try {
      const userResponse = await getUserInformation();
      setUser(userResponse.data);
      setCampus(userResponse.data.campusId);
    } catch (error) {
      console.log(error);
    }
  }
}
