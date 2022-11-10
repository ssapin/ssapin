import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { pixelToRem } from "../../utils/functions/util";
import MapCircleButton from "./MapCircleButton";
import { ReactComponent as KakaotalkIcon } from "../../assets/svgs/kakaotalk.svg";

declare global {
  interface Window {
    Kakao: any;
  }
}

const WhiteButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(2)} ${pixelToRem(7)} 0
    ${(props) => props.theme.colors.gray300};
  background-color: ${(props) => props.theme.colors.gray0};
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    fill: ${(props) => props.theme.colors.lightBlue};
  }
`;

function KakaoShareButton() {
  useEffect(() => {
    createKakaoButton();
  }, []);
  const createKakaoButton = () => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
      }

      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "SSAPIN",
          description: "#SSAPIN #SSAFY #장소 #큐레이팅",
          imageUrl:
            "https://trippiece607.s3.ap-northeast-2.amazonaws.com/%EC%8B%B8%ED%95%80%EB%A1%9C%EA%B3%A0.png",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <WhiteButton id="kakao-link-btn" type="button">
      <KakaotalkIcon height="60%" />
    </WhiteButton>
  );
}

export default KakaoShareButton;
