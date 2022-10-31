import styled from "@emotion/styled";
import { ReactComponent as InstagramIcon } from "../../assets/svgs/instagram.svg";
import { ReactComponent as FacebookIcon } from "../../assets/svgs/facebook.svg";
import { ReactComponent as KakaotalkIcon } from "../../assets/svgs/kakaotalk.svg";

const Container = styled.div`
  width: inherit;
  height: 20vh;
  background-color: transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SNSContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray400};
    font-family: ${(props) => props.theme.fontFamily.s1};
    letter-spacing: 0.5px;
  }
`;

const IconContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CopyRight = styled.div`
  width: fit-content;
  padding: 10px;

  p {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray400};
    font-family: ${(props) => props.theme.fontFamily.s1};
    padding: 5px;
    letter-spacing: 0.7px;
  }
`;

const Icon = styled.div`
  padding: 10px;
`;

function Footer() {
  return (
    <Container>
      <SNSContainer>
        <IconContainer>
          <Icon>
            <a
              href="https://www.instagram.com/zzuap_archive/?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
          </Icon>
          <Icon>
            <a
              href="https://ko-kr.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
          </Icon>
          <Icon>
            <a
              href="http://pf.kakao.com/_mLgKxj"
              target="_blank"
              rel="noreferrer"
            >
              <KakaotalkIcon fill="#999999" />
            </a>
          </Icon>
        </IconContainer>
        <p>SNS를 통해 SSAPIN의 소식을 알려드립니다.</p>
      </SNSContainer>
      <CopyRight>
        <p>Copyrightⓒ2022 SSAPIN📍</p>
        <p>유지연 | 남은열 | 박지원 | 허어설 | 이현규 | 임상빈</p>
      </CopyRight>
    </Container>
  );
}

export default Footer;
