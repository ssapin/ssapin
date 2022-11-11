import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/types/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";

interface MoreTextProps extends IButtonProps {
  text1: string;
  text2: string;
}

const StyledYellow = styled.button`
  flex-grow: 0;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.mainYellow};
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 1.21;
  letter-spacing: ${pixelToRem(-1.2)};
  text-align: center;
  color: ${(props) => props.theme.colors.gray900};
  transition: all 0.2s ease-out;

  &:hover {
    background-color: #ffdf1d;
    scale: 1.06;
    cursor: pointer;
  }
`;

const StyledBigYellow = styled.button`
  flex-grow: 0;
  padding: 6.9px 97.9px 7.9px 99px;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.mainYellow};
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
  display: block;
  justify-content: center;
  text-align: center;

  ${(props) => props.theme.mq.mobile} {
    padding: 6.9px 70px 7.9px 70px;
    margin-bottom: 1rem;
  }

  &:hover {
    background-color: #ffdf1d;
    scale: 1.06;
    cursor: pointer;
  }
  .red-textbox {
    color: ${(props) => props.theme.colors.mainRed};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    line-height: 1.13;
    letter-spacing: ${pixelToRem(-0.8)};

    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }
  .main-textbox {
    font-size: ${(props) => props.theme.fontSizes.h3};
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    color: ${(props) => props.theme.colors.gray900};
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    letter-spacing: ${pixelToRem(-1.2)};

    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.h4};
    }
  }
`;

export default function YellowButton({
  text,
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledYellow type={type} onClick={func} disabled={disabled}>
      {text}
    </StyledYellow>
  );
}

export function BigYellowButton({
  text1,
  text2,
  type,
  func,
  disabled,
}: MoreTextProps) {
  return (
    <StyledBigYellow type={type} onClick={func} disabled={disabled}>
      <div className="red-textbox">{text1}</div>
      <div className="main-textbox">{text2}</div>
    </StyledBigYellow>
  );
}
