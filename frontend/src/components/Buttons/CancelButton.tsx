import React from "react";
import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";

const StyledCancel = styled.button`
  width: 10vh;
  height: 5vh;
  flex-grow: 0;
  padding: ${pixelToRem(8)} ${pixelToRem(30)};
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.gray300};
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: 1.13;
  letter-spacing: ${pixelToRem(-0.8)};
  text-align: center;
  color: ${(props) => props.theme.colors.gray600};
`;

export default function CancelButton({
  text,
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledCancel type={type} onClick={func} disabled={disabled}>
      {text}
    </StyledCancel>
  );
}
