import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.subYellow};
  border-radius: 14px;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  padding: 0.7rem;
  width: fit-content;
  ${(props) => props.theme.mq.mobile} {
    font-size: ${(props) => props.theme.fontSizes.s1};
  }
`;

function TogetherMapNoticeCard() {
  const [open, setOpen] = useState(true);
  return (
    open && (
      <Container onClick={() => setOpen(false)}>
        <p>📌 테마지도는 딱 한 곳의 장소만 추가할 수 있어요 !</p>
      </Container>
    )
  );
}
export default TogetherMapNoticeCard;
