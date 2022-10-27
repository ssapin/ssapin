import React from "react";
import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";

const StyledCreate = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 67px;
  padding: 15px;
  flex-grow: 0;
  border-radius: ${pixelToRem(25)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  color: ${(props) => props.theme.colors.gray0};
  text-align: center;
  .text {
    bottom: 25%;
    width: 155px;
    font-size: ${(props) => props.theme.fontSizes.h3};
    line-height: 1.21;
    letter-spacing: ${pixelToRem(-1.2)};
  }
  .plus {
    width: 45px;
    height: 45px;
    .horizontal-line {
      position: relative;
      background-color: ${(props) => props.theme.colors.gray0};
      width: 55%;
      height: 5%;
      left: 20.5%;
      top: 45%;
    }
    .vertical-line {
      position: relative;
      background-color: ${(props) => props.theme.colors.gray0};
      width: 5%;
      height: 55%;
      left: 45%;
      top: 15%;
    }
  }
`;

export default function CreateButton({
  text,
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledCreate type={type} onClick={func} disabled={disabled}>
      <div className="text">{text}</div>
      <div className="plus">
        <div className="horizontal-line" />
        <div className="vertical-line" />
      </div>
    </StyledCreate>
  );
}
