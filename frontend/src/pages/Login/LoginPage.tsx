import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../store/atom";
import { getUserInformation, login } from "../../utils/apis/useApis";
import { cookie } from "../../utils/functions/util";

function LoginPage() {
  const [searchParams] = useSearchParams();
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;
    (async () => {
      try {
        const response = await login(kakaoCode);
        const { data } = response;
        console.log(data);
        if (data?.accessToken) {
          const option = {
            path: "/",
            secure: true,
            sameSite: true,
          };
          cookie.set("accessToken", data?.accessToken, option);
          try {
            const userResponse = await getUserInformation();
            setAuth(userResponse.data);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
    navigate("/");
  }, []);

  return <div>Login</div>;
}

export default LoginPage;
