import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import RankingUserCard from "../../components/card/RankingUserCard";
import { IUserRanking } from "../../utils/types/user.interface";

const Container = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => props.innerWidth < 550 && `7vw`};
  padding-right: ${(props) => props.innerWidth < 550 && `7vw`};

  padding-left: ${(props) => props.innerWidth >= 1700 && `19vw`};
  padding-right: ${(props) => props.innerWidth >= 1700 && `19vw`};

  padding-left: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};
  padding-right: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};

  margin-top: 4rem;
`;

const RankingContainer = styled.div<{ innerWidth?: number; size?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: ${(props) =>
    props.size < 5 && props.innerWidth > 950
      ? `space-evenly`
      : `space-between`};
  align-items: center;
  margin-top: 0.5rem;
`;

const Title = styled.div<{ innerWidth: number }>`
  padding-left: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }
`;

const Description = styled.div<{ innerWidth: number }>`
  padding-top: 1rem;
  padding-left: ${(props) => (props.innerWidth < 950 ? `1rem` : `2rem`)};
  padding-right: ${(props) => (props.innerWidth < 950 ? `1rem` : `0`)};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
  }
`;

const NoContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
`;

type UserProps = {
  users: IUserRanking[];
};

function UserRanking({ users }: UserProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <Container innerWidth={innerWidth}>
      <Title innerWidth={innerWidth}>
        🔥 <span>열정적인 싸핀러 Top 5</span>
      </Title>
      <Description innerWidth={innerWidth}>
        <p>싸핀을 열심히 이용하는 열.정.적.인 싸핀러들을 소개합니다 😎</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>
      {innerWidth >= 950 ? (
        <RankingContainer innerWidth={innerWidth} size={users.length}>
          {users.length !== 0 &&
            users.map((user, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <RankingUserCard key={i} user={user} />
            ))}
          {users?.length === 0 && <NoContainer>없어요</NoContainer>}
        </RankingContainer>
      ) : (
        <RankingContainer innerWidth={innerWidth}>
          {users.length !== 0 && (
            <>
              <RankingUserCard user={users[0]} type="large" />
              {users.length >= 2 && (
                <RankingContainer>
                  {users.length >= 2 && <RankingUserCard user={users[1]} />}
                  {users.length >= 3 && <RankingUserCard user={users[2]} />}
                </RankingContainer>
              )}
              {users.length >= 4 && (
                <RankingContainer>
                  {users.length >= 4 && <RankingUserCard user={users[3]} />}
                  {users.length >= 5 && <RankingUserCard user={users[4]} />}
                </RankingContainer>
              )}
            </>
          )}
          {users?.length === 0 && <NoContainer>없어요</NoContainer>}
        </RankingContainer>
      )}
    </Container>
  );
}

export default UserRanking;
