import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { login } from "../../utils/apis/useApis";
import { cookie } from "../../utils/functions/util";

function LoginPage() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const kakaoCode = searchParams.get("code");
    if (!kakaoCode) return;
    (async () => {
      try {
        const response = await login(kakaoCode);
        const { data } = response;

        if (data?.accessToken) {
          const option1 = {
            path: "/",
            httpOnly: true,
            secure: true,
          };
          const option2 = {
            path: "/",
            secure: true,
          };
          cookie.set("accessToken", data?.accessToken, option1);
          cookie.set("refreshToken", data?.refreshToken, option2);
        }
      } catch {}
    })();
  }, []);

  return <div>Login</div>;
}

export default LoginPage;
