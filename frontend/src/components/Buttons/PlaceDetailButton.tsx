import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as PinIcon } from "../../assets/svgs/mappin.svg";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledPlaceDetail = styled.div`
  width: 186px;
  height: 100px;
  flex-grow: 0;
  padding: 0 0 8px;
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
`;

const BubbleButton = styled.button`
  .speech-bubble {
    width: 100px;
    position: relative;
    background: #fafafa;
    border-radius: 0.4em;
  }
  .speech-bubble:after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-top-color: #fafafa;
    border-bottom: 0;
    margin-left: -24px;
    margin-bottom: -24px;
  }
`;

export default function PlaceDetailButton({ type, text, func }: IButtonProps) {
  return (
    <StyledPlaceDetail>
      <BubbleButton type={type} onClick={func}>
        {text}
      </BubbleButton>
      <PinIcon />
    </StyledPlaceDetail>
  );
}
