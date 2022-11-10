import styled from "@emotion/styled";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.subYellow};
  border-radius: 14px;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  padding: 0.7rem;
  width: fit-content;
`;

function TogetherMapNoticeCard() {
  return (
    <Container>
      <p>📌 테마지도는 딱 한 곳의 장소만 추가할 수 있어요 !</p>
    </Container>
  );
}
export default TogetherMapNoticeCard;
