import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ssapinLogoWebp from "../../assets/image/solo_logo.webp";
import ssapinLogoPng from "../../assets/image/solo_logo.png";

const Container = styled.main`
  width: 100vw;
  height: 85vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  position: fixed;

  > picture {
    width: 50%;
    transform: rotate(20deg);
    max-width: 600px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    color: ${(props) => props.theme.colors.gray0};
  }
  ${(props) => props.theme.mq.mobile} {
    flex-direction: column;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainYellow};
  padding: 0.5rem 1rem;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fontFamily.h1bold};
  margin-top: 2rem;
  transition: all 0.2s ease-in;
  :hover {
    transform: scale(1.05);
  }
`;

function NotFoundPage() {
  const navigate = useNavigate();
  const moveToMain = () => {
    navigate("/");
  };
  return (
    <Container>
      <picture>
        <source srcSet={ssapinLogoWebp} type="image/webp" />
        <img src={ssapinLogoPng} alt="ssapin logo" width="596" height="810" />
      </picture>
      <div>
        <p>잘못들어오신거 가툰뎅</p>
        <p>싸핀 구경하러 가쉴?</p>
        <Button type="button" onClick={moveToMain}>
          싸핀 ...더보기 👆
        </Button>
      </div>
    </Container>
  );
}

export default NotFoundPage;
