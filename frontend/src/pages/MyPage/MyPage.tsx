import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import Navbar from "../Navbar/Navbar";
import UserInfoCard from "../../components/card/UserInfoCard";
import UserInfoDetailCard from "../../components/card/UserInfoDetailCard";
import MyPageTab from "./MyPageTab";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";

const PageTopBg = styled.div`
  width: 100%;
  padding: ${pixelToRem(0)} ${pixelToRem(20)} ${pixelToRem(40)}
    ${pixelToRem(20)};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.gray0};
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${(props) => props.theme.mq.mobile} {
    flex-direction: column;
  }
  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  button {
    margin: 0.5rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

function MyPage() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <div>
      <Navbar />
      <PageTopBg>
        <UserInfos>
          {innerWidth > 1000 ? (
            <UserInfoCard
              type="pc"
              emoji="🧛‍♂️"
              nickname="허설래미저쩔래미"
              campus="서울"
            />
          ) : (
            <UserInfoCard
              type="mobile"
              emoji="🧛‍♂️"
              nickname="허설래미저쩔래미"
              campus="서울"
            />
          )}
          {innerWidth > 1000 ? (
            <UserInfoDetailCard
              type="pc"
              nickname="허설래미저쩔래미"
              mapcnt={35}
              placecnt={35}
              participatecnt={3500}
            />
          ) : (
            <UserInfoDetailCard
              type="mobile"
              nickname="허설래미저쩔래미"
              mapcnt={35}
              placecnt={35}
              participatecnt={3500}
            />
          )}
        </UserInfos>
      </PageTopBg>
      <MyPageTab />
      <FixContainer>
        <MoveToTopButton />
        {innerWidth > 900 ? (
          <CreateButton type="button" text="지도 만들기" />
        ) : (
          <CreateButtonMobile type="button" />
        )}
      </FixContainer>
    </div>
  );
}

export default MyPage;
