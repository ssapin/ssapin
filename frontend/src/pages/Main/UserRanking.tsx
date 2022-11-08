import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import RankingUserCard from "../../components/card/RankingUserCard";
import { IUserRanking } from "../../utils/types/user.interface";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 17vw;
  padding-right: 17vw;
  margin-top: 4rem;

  ${(props) => props.theme.mq.mobile} {
    padding-left: 5vw;
    padding-right: 5vw;
  }
`;

const RankingContainer = styled.div<{ size?: number }>`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;

  ${(props) => props.theme.mq.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  ${(props) => props.theme.mq.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: left;

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 0;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: 1rem;
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};

    ${(props) => props.theme.mq.tablet} {
      padding-right: 0;
    }

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s1};
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
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
    <Container>
      <Title>
        🔥 <span>열정적인 싸핀러 Top 5</span>
      </Title>
      <Description>
        <p>싸핀을 열심히 이용하는 열.정.적.인 싸핀러들을 소개합니다 😎</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>
      {innerWidth >= 950 ? (
        <RankingContainer size={users.length}>
          {users.length !== 0 &&
            users.map((user, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <RankingUserCard key={i} user={user} />
            ))}
          {users?.length === 0 && <NoContainer>없어요</NoContainer>}
        </RankingContainer>
      ) : (
        <>
          {users.length !== 0 && (
            <>
              <RankingUserCard user={users[0]} type="full" />
              {users.length >= 2 && (
                <RankingContainer>
                  {users.map(
                    (user, id) =>
                      id >= 1 && (
                        // eslint-disable-next-line react/no-array-index-key
                        <RankingUserCard key={id} user={user} />
                      ),
                  )}
                </RankingContainer>
              )}
            </>
          )}
          {users?.length === 0 && <NoContainer>없어요</NoContainer>}
        </>
      )}
    </Container>
  );
}

export default UserRanking;
