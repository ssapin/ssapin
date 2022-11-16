import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as MenuIcon } from "../../assets/svgs/hamburgerbar.svg";

const StyledMenu = styled.button`
  width: ${pixelToRem(50)};
  height: ${pixelToRem(50)};
  padding: 5px;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.mainBlue};
`;
type MenuProps = {
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
};
export default function MenuButton({ func }: MenuProps) {
  return (
    <StyledMenu type="button" onClick={func} aria-label="navigaition button">
      <MenuIcon />
    </StyledMenu>
  );
}
