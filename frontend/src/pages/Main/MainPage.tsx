import React from "react";
import USER_APIS from "../../utils/apis/useApis";

function MainPage() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${USER_APIS.REDIRECT_URI}`;

  console.log(KAKAO_AUTH_URL);
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <div>
      MainPage
      <button type="button" onClick={handleKakaoLogin}>
        카카오톡 로그인
      </button>
    </div>
  );
}

export default MainPage;
