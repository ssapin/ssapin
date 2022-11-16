import styled from "@emotion/styled";
import ModalContainer from "../../components/containers/ModalContainer";
import { ReactComponent as KakaoLogo } from "../../assets/svgs/kakao.svg";
import USER_APIS from "../../utils/apis/userApis";

interface LoginModalProps {
  onClose: () => void;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  letter-spacing: -5%;
`;

const Pin = styled.p`
  padding: 1rem 0;
`;

const KaKakoLoginButton = styled.button`
  background-color: #fee500;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  height: fit-content;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in;
  color: black;
  align-items: center;
  & > div {
    display: flex;
    align-items: center;
    height: ${(props) => props.theme.fontSizes.h2};
  }
  > p {
    font-size: ${(props) => props.theme.fontSizes.h4};
    height: ${(props) => props.theme.fontSizes.h4};
  }
  svg {
    align-items: center;
    margin-right: 0.5rem;
  }
  &:hover {
    transform: translateY(-2px);
    background-color: #dfc908;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`;

function LoginModal({ onClose }: LoginModalProps) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${USER_APIS.REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <p>
          캠퍼스 주변 <br />
          우리들만의 장소 알고 싶나요?
        </p>
        <Pin>📌</Pin>
        <p>
          싸핀과 함께 <br />
          당신의 핀랜드를 <br /> 만들어 보세요!
        </p>
        <ButtonContainer>
          <KaKakoLoginButton type="button" onClick={handleKakaoLogin}>
            <div>
              <KakaoLogo />
            </div>
            <p>카카오톡 로그인</p>
          </KaKakoLoginButton>
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default LoginModal;
