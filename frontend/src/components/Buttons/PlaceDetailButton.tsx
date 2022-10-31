import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledPlaceDetail = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  .main-box {
    width: 45vh;
    height: 10vh;
    padding: 15px 9px 14px;
    border-radius: 15px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: ${(props) => props.theme.colors.gray50};
  }
  .small-triangle {
    width: 30px;
    height: 23px;
    transform: rotate(-180deg);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    background-color: ${(props) => props.theme.colors.gray50};
  }
`;

export default function PlaceDetailButton({
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledPlaceDetail type={type} onClick={func} disabled={disabled}>
      <div className="main-box">
        <div className="small-triangle" />
      </div>
    </StyledPlaceDetail>
  );
}
