import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/types/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";

const StyledCreate = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  flex-grow: 0;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  color: ${(props) => props.theme.colors.gray0};
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
    scale: 1.06;
  }
  .text {
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4};
    line-height: 1.21;
    letter-spacing: ${pixelToRem(-1.2)};
  }
  .plus {
    width: 1.5rem;
    height: 1.5rem;
  }
  ${(props) => props.theme.mq.mobile} {
    display: none;
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
