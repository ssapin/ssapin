import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ReactComponent as Quotesstart } from "../../assets/svgs/quotesstart.svg";
import { ReactComponent as Quotesend } from "../../assets/svgs/quotesend.svg";

type TogetherMapProps = {
  title: string;
  usercnt: number;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
};

const Container = styled.div<{ innerWidth: number }>`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;

  .icon {
    position: absolute;
    width: ${(props) => (props.innerWidth >= 950 ? `14vw` : `17rem`)};
    margin-bottom: 4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray400};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    margin-top: 0.8rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 999;
  }

  .participate {
    margin-top: 0.4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

function TogetherMapCard({ title, usercnt, func }: TogetherMapProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <Container onClick={func} innerWidth={innerWidth}>
      <p className="icon">
        <Quotesstart />
        <Quotesend />
      </p>
      <p className="title">{title}</p>
      <p className="participate">🙋‍♂️ {usercnt}명이 참여</p>
    </Container>
  );
}

export default TogetherMapCard;
