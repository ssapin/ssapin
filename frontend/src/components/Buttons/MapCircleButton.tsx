import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";
import { ReactComponent as KakaotalkIcon } from "../../assets/svgs/kakaotalk.svg";
import { ReactComponent as LinkShareIcon } from "../../assets/svgs/linkshare.svg";
import { ReactComponent as EHeartIcon } from "../../assets/svgs/emptyheart.svg";
import { ReactComponent as FHeartIcon } from "../../assets/svgs/fullheart.svg";
import { ReactComponent as LocationIcon } from "../../assets/svgs/nowlocation.svg";

interface ChooseFeature extends IButtonProps {
  shape: string | number | undefined;
}
const WhiteCircle = styled.button`
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
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
    width: 4.5vh;
    height: 4.5vh;
    fill: ${(props) => props.theme.colors.lightBlue};
  }
`;

export default function MapCircleButton({
  type,
  func,
  disabled,
  shape,
}: ChooseFeature) {
  return (
    <WhiteCircle type={type} onClick={func} disabled={disabled} shape={shape}>
      {shape === "0" && <KakaotalkIcon className="not-location" />}
      {shape === "1" && <LinkShareIcon width={35} height={35} fill="none" />}
      {shape === "2" && <EHeartIcon className="not-location" />}
      {shape === "3" && <FHeartIcon className="not-location" />}
      {shape === "4" && <LocationIcon className="my-location" />}
    </WhiteCircle>
  );
}
