import styled from "@emotion/styled";

type MapTitleProps = {
  user: string;
  title: string;
  // eslint-disable-next-line react/require-default-props
  used?: string;
};

const Container = styled.div<{ used?: string }>`
  background-color: ${(props) => props.theme.colors.gray50};
  border-radius: 10px;
  margin: 1rem;
  width: ${(props) => (props.used === "modal" ? `90%` : `22rem`)};
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

function MapTitleCard({ user, title, used }: MapTitleProps) {
  return (
    <Container used={used}>
      <p className="user">{user}</p>
      <p className="title">{title}</p>
    </Container>
  );
}

export default MapTitleCard;
