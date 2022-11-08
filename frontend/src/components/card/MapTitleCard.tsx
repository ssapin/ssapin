import styled from "@emotion/styled";

type MapTitleProps = {
  user: string;
  title: string;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray50};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 4rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;

  .user {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s1};
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }
`;

function MapTitleCard({ user, title }: MapTitleProps) {
  return (
    <Container>
      <p className="user">{user}</p>
      <p className="title">{title}</p>
    </Container>
  );
}

export default MapTitleCard;
