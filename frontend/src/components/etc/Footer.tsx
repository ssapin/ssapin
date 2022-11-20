import styled from "@emotion/styled";
import { ReactComponent as InstagramIcon } from "../../assets/svgs/instagram.svg";
import { ReactComponent as NotionIcon } from "../../assets/svgs/notion.svg";
import { ReactComponent as KakaotalkIcon } from "../../assets/svgs/kakaotalk.svg";

const Container = styled.footer`
  width: inherit;
  height: 30vh;
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
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    letter-spacing: 0.5px;

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.paragraph};
      font-size: ${(props) => props.theme.fontSizes.s2};
    }
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
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    padding: 5px;
    letter-spacing: 0.7px;

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.paragraph};
      font-size: ${(props) => props.theme.fontSizes.s2};
    }
  }
`;

const Icon = styled.div`
  padding: 10px;
`;

type FooterProps = {
  nav: boolean;
};

function Footer({ nav }: FooterProps) {
  return (
    <Container>
      <SNSContainer>
        <IconContainer>
          <Icon>
            <a
              href="https://www.instagram.com/ssapin_official/"
              target="_blank"
              rel="noreferrer"
              aria-label="instagram"
            >
              <InstagramIcon />
            </a>
          </Icon>
          <Icon>
            <a
              href="https://positive-gambler-f01.notion.site/SSAPIN-9ab287af8b1b4226924574edef1017be"
              target="_blank"
              rel="noreferrer"
              aria-label="notion"
            >
              <NotionIcon />
            </a>
          </Icon>
          <Icon>
            <a
              href="http://pf.kakao.com/_mLgKxj"
              target="_blank"
              rel="noreferrer"
              aria-label="kakao channel"
            >
              <KakaotalkIcon fill="#999999" />
            </a>
          </Icon>
        </IconContainer>
        <p>SNS를 통해 SSAPIN의 소식을 알려드립니다.</p>
      </SNSContainer>
      {!nav && (
        <CopyRight>
          <p>Copyrightⓒ2022 SSAPIN📍</p>
          <p>유지연 | 남은열 | 박지원 | 허어설 | 이현규 | 임상빈</p>
        </CopyRight>
      )}
    </Container>
  );
}

export default Footer;
