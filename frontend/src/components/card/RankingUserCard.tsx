import styled from "@emotion/styled";

type UserRankingProps = {
  user: {
    emoji: string;
    nickname: string;
    mapcnt: number;
  };
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 10.6rem;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;

  .emoji {
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h3};
  }

  .nickname {
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h3bold};
  }

  .mapcnt {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }
`;

function RankingUserCard({ user }: UserRankingProps) {
  return (
    <Container>
      <p className="emoji">{user.emoji}</p>
      <p className="nickname">{user.nickname}</p>
      <p className="mapcnt">{user.mapcnt}개의 지도</p>
    </Container>
  );
}

export default RankingUserCard;
