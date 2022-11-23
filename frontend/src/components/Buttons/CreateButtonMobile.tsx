import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/types/buttons.interface";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";

const StyledCreate = styled.button`
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 3.15rem;
  height: 3.15rem;
  background-color: ${(props) => props.theme.colors.lightBlue};
  ${(props) => props.theme.mq.tablet} {
    display: flex;
  }
`;

export default function CreateButtonMobile({
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledCreate
      type={type}
      onClick={func}
      disabled={disabled}
      aria-label="지도만들기"
    >
      <PlusIcon />
    </StyledCreate>
  );
}
