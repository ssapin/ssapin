import styled from "@emotion/styled";
import { IUserRanking } from "../../utils/types/user.interface";

type UserRankingProps = {
  user: IUserRanking;
  // eslint-disable-next-line react/require-default-props
  type?: string;
};

const Container = styled.div<{ type: string; nickname: string }>`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  width: ${(props) => (props.type === "full" ? `95%` : `100%`)};
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;

  ${(props) => props.theme.mq.tablet} {
    height: 7.5rem;
    margin: ${(props) => (props.type === "full" ? `0.7rem` : `0`)};
  }

  .emoji {
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h3};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }
  }

  .nickname {
    width: 100%;
    text-align: center;
    font-size: ${(props) =>
      props.nickname.length >= 8
        ? props.theme.fontSizes.h5
        : props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) =>
        props.nickname.length >= 8
          ? props.theme.fontSizes.paragraph
          : props.theme.fontSizes.h5};
    }

    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .mapcnt {
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s1};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s2};
      font-size: ${(props) => props.theme.fontSizes.s2};
    }
  }
`;

function RankingUserCard({ user, type }: UserRankingProps) {
  return (
    <Container type={type} nickname={user.nickname}>
      <p className="emoji">{user.emoji}</p>
      <p className="nickname">{user.nickname}</p>
      <p className="mapcnt">{user.mapCount}개의 지도</p>
    </Container>
  );
}

export default RankingUserCard;
