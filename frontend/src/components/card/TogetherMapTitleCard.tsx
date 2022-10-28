import styled from "@emotion/styled";
import { ReactComponent as Quotesstart } from "../../assets/svgs/quotesstart.svg";
import { ReactComponent as Quotesend } from "../../assets/svgs/quotesend.svg";

type TogetherMapTitleProps = {
  title: string;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 4.5rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray50};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  .icon {
    position: absolute;
    width: 18rem;
    margin-bottom: 1rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    margin-top: 0.4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 2;
  }
`;

function TogetherMapTitleCard({ title }: TogetherMapTitleProps) {
  return (
    <Container>
      <p className="icon">
        <Quotesstart />
        <Quotesend />
      </p>
      <p className="title">{title}</p>
    </Container>
  );
}

export default TogetherMapTitleCard;
