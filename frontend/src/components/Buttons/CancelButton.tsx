import styled from "@emotion/styled";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";
import { pixelToRem } from "../../utils/functions/util";

const StyledCancel = styled.button`
  height: 4.761904761904762vh;
  flex-grow: 0;
  padding: 0 ${pixelToRem(30)};
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.gray300};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: 0.5;
  letter-spacing: ${pixelToRem(-0.8)};
  text-align: center;
  color: ${(props) => props.theme.colors.gray600};
`;

export default function CancelButton({
  text,
  type,
  func,
  disabled,
}: IButtonProps) {
  return (
    <StyledCancel type={type} onClick={func} disabled={disabled}>
      {text}
    </StyledCancel>
  );
}
