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
          📌 모여지도는 딱 <span>한</span> 곳의 장소만 추가할 수 있어요 !
        </p>
      </Container>
    )
  );
}
export default TogetherMapNoticeCard;
