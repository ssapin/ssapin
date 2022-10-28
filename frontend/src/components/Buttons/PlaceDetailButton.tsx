import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledPlaceDetail = styled.button`
.main-box{
    width: 186px;
    height: 46px;
    margin: 42px 0 18px;
    padding: 15px 9px 14px;
    border-radius: 15px;SS
    box-shadow: 0 4px 4px 0 rgba(0, 0S, 0, 0.25);
    background-color:  ${(props) => props.theme.colors.gray50};
}
  .small-triangle {
    width: 30px;
    height: 23px;
    margin: 21px 78px 0;S
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
      <div className="small-triangle"   type={type}
        onClick={func}
        disabled={disabled}/>
        <StyledPlaceDetail
      
        className="main-box"
        >
        </StyledPlaceDetail>
      </div>
  );
}
