import styled from "@emotion/styled";
import { ReactComponent as Quotesstart } from "../../assets/svgs/quotesstart.svg";
import { ReactComponent as Quotesend } from "../../assets/svgs/quotesend.svg";

type TogetherMapTitleProps = {
  title: string;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  width: fit-content;
  height: 50px;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray50};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;

  > p {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 2;
  }
`;

const IconAndTitleWrapper = styled.div`
  width: 100%;
  height: 10%;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > svg {
    fill: ${(props) => props.theme.colors.subYellow};
    width: 20px;
    height: 20px;
  }

  ${(props) => props.theme.mq.mobile} {
    width: 100%;
  }
`;

function TogetherMapTitleCard({ title }: TogetherMapTitleProps) {
  return (
    <Container>
      <IconAndTitleWrapper>
        <Quotesstart className="quotes" />
        <Quotesend className="quotes" />
      </IconAndTitleWrapper>
      <p>{title}</p>
    </Container>
  );
}

export default TogetherMapTitleCard;
