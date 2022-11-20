import RankingUserCard from "../../components/card/RankingUserCard";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import { LessPC, PC } from "../../components/containers/MediaQueryContainer";
import { IUserRanking } from "../../utils/types/user.interface";

type UserProps = {
  users: IUserRanking[];
};

function UserRanking({ users }: UserProps) {
  return (
    <MainSectionContainer tag="section">
      <MainTitleContainer>
        <>
          🔥 <span>열정적인 싸핀러 Top 5</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>싸핀을 열심히 이용하는 열.정.적.인 싸핀러들을 소개합니다 😎</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </MainDescriptionContainer>
      {users && (
        <>
          <PC>
            <MainCardListContainer column={15}>
              {users?.length !== 0 &&
                users?.map((user) => (
                  <RankingUserCard key={user.userId} user={user} />
                ))}
            </MainCardListContainer>
          </PC>
          <LessPC>
            {users?.length !== 0 && (
              <>
                <RankingUserCard user={users[0]} type="full" />
                {users?.length >= 2 && (
                  <MainCardListContainer mobileColumn={40}>
                    {users.map(
                      (user, id) =>
                        id >= 1 && (
                          <RankingUserCard key={user.userId} user={user} />
                        ),
                    )}
                  </MainCardListContainer>
                )}
              </>
            )}
          </LessPC>
        </>
      )}
      {users?.length === 0 && (
        <MainNoDataContainer>
          <p>아직 지도를 만든 유저가 없어요 😥</p>
        </MainNoDataContainer>
      )}
    </MainSectionContainer>
  );
}

export default UserRanking;
