import styled from "@emotion/styled";
import loading from "../../assets/image/loading.gif";
import loadingWebm from "../../assets/image/video.webm";
import loadingMp4 from "../../assets/image/video.mp4";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  video {
    width: 50%;
    height: auto;

    ${(props) => props.theme.mq.mobile} {
      width: 100%;
      height: auto;
    }
  }
`;

function Loading() {
  return (
    <Container>
      <video autoPlay loop muted playsInline>
        <source src={loadingWebm} type="video/webm" />
        <source src={loadingMp4} type="video/mp4" />
        <img alt="loading" src={loading} />
      </video>
    </Container>
  );
}

export default Loading;
