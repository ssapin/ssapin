import styled from "@emotion/styled";

type ProfileProps = {
  emoji: string;
  nickname: string;
};
const Container = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.mainNavy};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  padding: 0.5rem;
`;

function UserProfile({ emoji, nickname }: ProfileProps) {
  return (
    <Container>
      {emoji} {nickname}
    </Container>
  );
}

export default UserProfile;
