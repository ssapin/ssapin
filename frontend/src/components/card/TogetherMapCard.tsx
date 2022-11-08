import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Quotesstart } from "../../assets/svgs/quotesstart.svg";
import { ReactComponent as Quotesend } from "../../assets/svgs/quotesend.svg";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

type TogetherMapProps = {
  prop: ITogetherMap;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 100%;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  ${(props) => props.theme.mq.mobile} {
    height: 7.5rem;
    margin: 0;
  }

  .icon {
    width: 90%;
    height: 15%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray400};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    ${(props) => props.theme.mq.mobile} {
      width: 100%;
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }

    .quotes {
      fill: ${(props) => props.theme.colors.gray300};
    }
  }

  .title {
    text-align: center;
    height: 30%;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }

    width: 100%;
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .participate {
    height: 10%;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s1};
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

function TogetherMapCard({ prop }: TogetherMapProps) {
  const navigate = useNavigate();
  return (
    <Container
      onClick={() => {
        navigate(`/togethermaps/${prop.togethermapId}/detail`);
      }}
    >
      <p className="icon">
        <Quotesstart className="quotes" />
        <Quotesend className="quotes" />
      </p>
      <p className="title">{prop.title}</p>
      <p className="participate">🙋‍♂️ {prop.userCnt}명이 참여</p>
    </Container>
  );
}

export default TogetherMapCard;
