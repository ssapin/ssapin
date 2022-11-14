/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { useEffect } from "react";
import { pixelToRem } from "../../utils/functions/util";
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
  :hover {
    scale: 1.07;
  }
`;

interface IKakaoShareProps {
  title?: string;
  url?: string;
  description?: string;
}

const { Kakao } = window;

function KakaoShareButton({ title, url, description }: IKakaoShareProps) {
  const createKakaoButton = () => {
    if (Kakao) {
      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
      }
    }
  };

  const share = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title || "SSAPIN",
        description: description || "#SSAPIN #SSAFY #장소 #큐레이팅",
        imageUrl:
          "https://trippiece607.s3.ap-northeast-2.amazonaws.com/SSAPIN_SHARE.png",
        link: {
          mobileWebUrl: "https://www.ssapin.com",
          webUrl: "https://www.ssapin.com",
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: url || window.location.href,
            webUrl: url || window.location.href,
          },
        },
      ],
    });
  };
  useEffect(() => {
    createKakaoButton();
  }, []);

  return (
    <WhiteButton id="kakao-link-btn" type="button" onClick={share}>
      <KakaotalkIcon width="40px" height="40px" />
    </WhiteButton>
  );
}

export default KakaoShareButton;
