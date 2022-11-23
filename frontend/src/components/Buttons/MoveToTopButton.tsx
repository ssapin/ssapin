import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";
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
  width: 3.15rem;
  height: 3.15rem;
  border-radius: 50%;
  box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.gray0};
  padding: ${pixelToRem(2)};
  transition: all 0.2s ease-out;

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

export default function MoveToTopButton() {
  const [isTopBtn, setisTopBtn] = useState(false);

  let beforeScrollY = 0;

  const scrollEvent = useMemo(
    () =>
      throttle(() => {
        if (document.documentElement.scrollTop < 20) {
          setisTopBtn(false);
        } else if (window.pageYOffset < beforeScrollY) {
          setisTopBtn(false);
        } else {
          setisTopBtn(true);
        }
        beforeScrollY = window.pageYOffset;
      }, 300),
    [isTopBtn],
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  const goUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isTopBtn && (
      <RightFixed>
        <StyledUp type="button" onClick={goUp} aria-label="top button">
          <UpArrowIcon />
        </StyledUp>
      </RightFixed>
    )
  );
}
