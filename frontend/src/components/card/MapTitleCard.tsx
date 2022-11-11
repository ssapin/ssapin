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
  width: 100%;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  .user {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s1};
    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.s3};
    }
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h5};
    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.s1};
      font-family: ${(props) => props.theme.fontFamily.h5};
    }
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
