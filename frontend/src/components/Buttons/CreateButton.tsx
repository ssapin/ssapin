import React from "react";
import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";

const StyledCreate = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  padding: 15px;
  flex-grow: 0;
  border-radius: ${pixelToRem(25)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  color: ${(props) => props.theme.colors.gray0};
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .text {
    bottom: 25%;
    width: 120%;
    font-size: ${(props) => props.theme.fontSizes.h3};
    font-family: ${(props) => props.theme.fontFamily.h3};
    line-height: 1.21;
    letter-spacing: ${pixelToRem(-1.2)};
  }
  .plus {
    width: 5vh;
    height: 5vh;
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
      <PlusIcon className="plus" />
    </StyledCreate>
  );
}
