import styled from "@emotion/styled";
import loading from "../../assets/image/loading.gif";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
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
      <img alt="loading" src={loading} />
    </Container>
  );
}

export default Loading;
