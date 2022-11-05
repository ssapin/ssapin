import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as BuildingIcon } from "../../assets/svgs/building.svg";
import { ReactComponent as SsafyIcon } from "../../assets/svgs/ssafylogo.svg";
import { IButtonProps } from "../../utils/types/buttons.interface";

const StyledDetailPlace = styled.div`
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
  position: relative;
  z-index: 0;
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

const EmojiLocation = styled.div<{ size?: number }>`
  position: absolute;
  z-index: 1;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  text-align: center;
  padding-top: ${(props) => `${props.size * 0.35}px`};
  font-size: ${(props) => `${props.size * 0.7}px`};
`;

export default function MulticampusPlaceButton({ text, func }: IButtonProps) {
  return (
    <StyledDetailPlace>
      <EmojiLocation size={45}>
        <SsafyIcon />
      </EmojiLocation>
      <BubbleButton onClick={func}>{text}</BubbleButton>
      <SpeechPolygon />
      <BuildingIcon fill="red" />
    </StyledDetailPlace>
  );
}
