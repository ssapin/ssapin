import styled from "@emotion/styled";

type ProfileImageProps = {
  size: number;
  emoji: string;
};

const Container = styled.div<{ size?: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  border-radius: 50%;
  text-align: center;
  margin: 0.5rem;
  padding-top: ${(props) => `${props.size * 0.25}px`};
  font-size: ${(props) => `${props.size * 0.4}px`};
`;

function UserProfileImge({ size, emoji }: ProfileImageProps) {
  return <Container size={size}>{emoji}</Container>;
}

export default UserProfileImge;
