import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { IButtonProps } from "../../utils/types/buttons.interface";
import { ReactComponent as KakaotalkIcon } from "../../assets/svgs/kakaotalk.svg";
import { ReactComponent as LinkShareIcon } from "../../assets/svgs/linkshare.svg";
import { ReactComponent as EHeartIcon } from "../../assets/svgs/emptyheart.svg";
import { ReactComponent as FHeartIcon } from "../../assets/svgs/fullheart.svg";
import { ReactComponent as LocationIcon } from "../../assets/svgs/nowlocation.svg";

interface ChooseFeature extends IButtonProps {
  shape: string | number | undefined;
  // eslint-disable-next-line react/require-default-props
  height?: string;
}

const WhiteCircle = styled.button<{ height?: string }>`
  width: ${(props) => (props.height ? props.height : `7vh`)};
  height: ${(props) => (props.height ? props.height : `7vh`)};
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(2)} ${pixelToRem(7)} 0
    ${(props) => props.theme.colors.gray300};
  background-color: ${(props) => props.theme.colors.gray0};
  display: flex;
  justify-content: center;
  align-items: center;
  .my-location {
    width: 4.5vh;
    height: 4.5vh;
    fill: ${(props) => props.theme.colors.mainRed};
  }
  .not-location {
    width: 80%;
    height: 80%;
    fill: ${(props) => props.theme.colors.lightBlue};
  }
  .heart {
    width: 60%;
    height: 60%;
    fill: ${(props) => props.theme.colors.lightBlue};
  }
`;

export default function MapCircleButton({
  type,
  func,
  disabled,
  shape,
  height,
}: ChooseFeature) {
  return (
    <WhiteCircle type={type} onClick={func} disabled={disabled} height={height}>
      {shape === "0" && <KakaotalkIcon className="not-location" />}
      {shape === "1" && <LinkShareIcon width={25} fill="none" />}
      {shape === "2" && <EHeartIcon className="heart" />}
      {shape === "3" && <FHeartIcon className="heart" />}
      {shape === "4" && <LocationIcon className="my-location" />}
    </WhiteCircle>
  );
}
