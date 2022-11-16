import styled from "@emotion/styled";

type ProfileImageProps = {
  emoji: string;
};

const Container = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  ${(props) => props.theme.mq.tablet} {
    width: 120px;
    height: 120px;
  }
  ${(props) => props.theme.mq.mobile} {
    width: 120px;
    height: 120px;
    font-size: 60px;
  }
`;

function UserProfileImge({ emoji }: ProfileImageProps) {
  return <Container>{emoji}</Container>;
}

export default UserProfileImge;
