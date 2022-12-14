import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/types/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";

const StyledConfirm = styled.button<{ used: string | undefined }>`
  height: ${(props) => (props.used === "modal" ? `35px` : `35px`)};
  flex-grow: 0;
  padding: 0 ${pixelToRem(20)};
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: 0.5;
  letter-spacing: ${pixelToRem(-0.8)};
  text-align: center;
  color: ${(props) => props.theme.colors.gray50};
  transition: all 0.2s ease-in;
  :disabled {
    background-color: ${(props) => props.theme.colors.gray300};
    cursor: not-allowed;
  }
`;

export default function ConfirmButton({
  text,
  type,
  func,
  disabled,
  used,
}: IButtonProps) {
  return (
    <StyledConfirm used={used} type={type} onClick={func} disabled={disabled}>
      {text}
    </StyledConfirm>
  );
}
