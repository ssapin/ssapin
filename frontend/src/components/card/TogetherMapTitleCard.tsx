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
  height: 4rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray50};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;

  .icon {
    width: 100%;
    height: 10%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${(props) => props.theme.mq.mobile} {
      width: 100%;
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }
  }

  .quotes {
    fill: ${(props) => props.theme.colors.subYellow};
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
      <div className="icon">
        <Quotesstart className="quotes" />
        <Quotesend className="quotes" />
      </div>
      <p className="title">{title}</p>
    </Container>
  );
}

export default TogetherMapTitleCard;
