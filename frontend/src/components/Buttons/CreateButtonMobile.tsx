import React from "react";
import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledCreate = styled.button`
  border-radius: 50%;
  width: 7vh;
  height: 7vh;
  background-color: ${(props) => props.theme.colors.lightBlue};
  .horizontal-line {
    position: relative;
    background-color: ${(props) => props.theme.colors.gray0};
    width: 60%;
    height: 5%;
    left: 20%;
    top: 25%;
  }
  .vertical-line {
    position: relative;
    background-color: ${(props) => props.theme.colors.gray0};
    width: 5%;
    height: 50%;
    left: 47%;
    top: 0%;
  }
`;

export default function CreateButtonMobile({
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledCreate type={type} onClick={func} disabled={disabled}>
      <div className="horizontal-line" />
      <div className="vertical-line" />
    </StyledCreate>
  );
}
