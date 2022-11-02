import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import RankingUserCard from "../../components/card/RankingUserCard";

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

  margin-top: 3rem;
`;

const RankingContainer = styled.div<{ innerWidth?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: space-between;
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

function UserRanking() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const users = [
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
    {
      emoji: "🎈",
      nickname: "허설헬륨",
      mapcnt: 125,
    },
  ];

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
        <RankingContainer innerWidth={innerWidth}>
          {users.map((user, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <RankingUserCard key={i} user={user} />
          ))}
        </RankingContainer>
      ) : (
        <RankingContainer innerWidth={innerWidth}>
          <RankingUserCard user={users[0]} type="large" />
          <RankingContainer>
            <RankingUserCard user={users[1]} />
            <RankingUserCard user={users[2]} />
          </RankingContainer>
          <RankingContainer>
            <RankingUserCard user={users[3]} />
            <RankingUserCard user={users[4]} />
          </RankingContainer>
        </RankingContainer>
      )}
    </Container>
  );
}

export default UserRanking;
