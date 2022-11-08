import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as UpArrowIcon } from "../../assets/svgs/upperarrow.svg";

const RightFixed = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledUp = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vh;
  height: 7vh;
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.gray0};
  padding: ${pixelToRem(2)};

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

export default function MoveToTopButton() {
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <RightFixed>
      <StyledUp onClick={goUp}>
        <UpArrowIcon />
      </StyledUp>
    </RightFixed>
  );
}
