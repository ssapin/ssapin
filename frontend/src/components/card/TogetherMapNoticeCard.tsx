import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.subYellow};
  border-radius: 14px;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  padding: 0.7rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  width: fit-content;

  span {
    color: ${(props) => props.theme.colors.mainRed};
  }

  ${(props) => props.theme.mq.mobile} {
    font-size: ${(props) => props.theme.fontSizes.s1};
  }
  :hover {
    cursor: pointer;
  }
`;

function TogetherMapNoticeCard() {
  const [open, setOpen] = useState(true);
  return (
    open && (
      <Container onClick={() => setOpen(false)}>
        <p>
          π λͺ¨μ¬μ§λλ λ± <span>ν</span> κ³³μ μ₯μλ§ μΆκ°ν  μ μμ΄μ !
        </p>
      </Container>
    )
  );
}
export default TogetherMapNoticeCard;
