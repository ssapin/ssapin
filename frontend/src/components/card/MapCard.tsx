import styled from "@emotion/styled";

type MapCardProps = {
  icon: string;
  title: string;
  user: string;
  placecnt: number;
  usercnt: number;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  .icon {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }

  .title {
    margin-top: 0.4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }

  .user {
    margin-top: 0.4rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }

  .summary {
    text-align: right;
    margin-top: 1rem;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2bold};
  }
`;

function RecommandationMapCard({
  icon,
  title,
  user,
  placecnt,
  usercnt,
  func,
}: MapCardProps) {
  return (
    <Container onClick={func}>
      <p className="icon">{icon}</p>
      <p className="title">{title}</p>
      <p className="user">{user}</p>
      <p className="summary">
        📌 {placecnt} &nbsp; 🙋‍♂️ {usercnt}
      </p>
    </Container>
  );
}

export default RecommandationMapCard;
