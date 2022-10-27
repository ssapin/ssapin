import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const StyledUp = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${pixelToRem(3)};
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.gray0};
  padding-top: ${pixelToRem(14)};
  .up-arrow {
    flex-grow: 0;
    transform: rotate(-45deg);
    border-top: ${pixelToRem(3)} solid
      ${(props) => props.theme.colors.lightBlue};
    border-right: ${pixelToRem(3)} solid
      ${(props) => props.theme.colors.lightBlue};
    width: 40%;
    height: 40%;
  }
`;

export default function MoveToTopButton() {
  const goUp = () => {
    console.log("안녕히 계세요 여러분! 저는 올라가유~~");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <StyledUp onClick={goUp}>
      <div className="up-arrow" />
    </StyledUp>
  );
}
