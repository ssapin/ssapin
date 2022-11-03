import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as PinIcon } from "../../assets/svgs/mappin.svg";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledPlaceDetail = styled.div`
  width: ${pixelToRem(240)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > div {
    position: relative;
  }
`;

const BubbleButton = styled.button`
  width: 100%;
  height: 45px;
  border-radius: ${pixelToRem(15)};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  line-height: 1.13;
  letter-spacing: -0.8px;
  text-align: center;
  color: ${(props) => props.theme.colors.mainNavy};
  background-color: ${(props) => props.theme.colors.gray0};
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
`;
const SpeechPolygon = styled.div`
  content: "";
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-top-color: ${(props) => props.theme.colors.gray0};
  border-bottom: 0;
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25) inset;
  margin-bottom: 8px;
`;

const EmojiContainer = styled.div`
  position: absolute;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -70px;
  margin-left: 15.5px;
`;

const UserEmoji = styled.div<{ size?: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  border-radius: 50%;
  text-align: center;
  margin: 0.5rem;
  padding-top: ${(props) => `${props.size * 0.05}px`};
  font-size: ${(props) => `${props.size * 0.7}px`};
`;

export default function PlaceDetailButton({
  type,
  text,
  func,
  emoji,
}: IButtonProps) {
  return (
    <StyledPlaceDetail>
      <BubbleButton onClick={func}>{text}</BubbleButton>
      <SpeechPolygon />
      <div>
        <PinIcon />
        <EmojiContainer>
          <UserEmoji size={35}>
            <a href="https://www.naver.com/">{emoji}</a>
          </UserEmoji>
        </EmojiContainer>
      </div>
    </StyledPlaceDetail>
  );
}
