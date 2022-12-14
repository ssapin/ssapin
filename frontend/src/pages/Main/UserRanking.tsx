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
          π₯ <span>μ΄μ μ μΈ μΈνλ¬ Top 5</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>μΈνμ μ΄μ¬ν μ΄μ©νλ μ΄.μ .μ .μΈ μΈνλ¬λ€μ μκ°ν©λλ€ π</p>
        <p className="textRight">λ§€μΌ μ€μ  08:00 κΈ°μ€</p>
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
          <p>μμ§ μ§λλ₯Ό λ§λ  μ μ κ° μμ΄μ π₯</p>
        </MainNoDataContainer>
      )}
    </MainSectionContainer>
  );
}

export default UserRanking;
