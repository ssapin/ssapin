import styled from "@emotion/styled";

type UserRankingProps = {
  emoji: string;
  nickname: string;
  mapcnt: number;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 8rem;
  height: 7rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;

  .emoji {
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4};
  }

  .nickname {
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  }

  .mapcnt {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }
`;

function RankingUserCard({ emoji, nickname, mapcnt }: UserRankingProps) {
  return (
    <Container>
      <p className="emoji">{emoji}</p>
      <p className="nickname">{nickname}</p>
      <p className="mapcnt">{mapcnt}개의 지도</p>
    </Container>
  );
}

export default RankingUserCard;
