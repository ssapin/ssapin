import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { pixelToRem } from "../../utils/functions/util";
import Navbar from "../Navbar/Navbar";
import UserInfoCard from "../../components/card/UserInfoCard";
import UserInfoDetailCard from "../../components/card/UserInfoDetailCard";
import MyPageTab from "./MyPageTab";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import { campusState, userInformationState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";

const PageTopBg = styled.div`
  width: 100%;
  height: 65vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.gray0};
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  button {
    margin: 0.5rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

function MyPage() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const userInformation = useRecoilValue(userInformationState);
  const campus = CAMPUS_LIST;
  const [campusId, setCampusId] = useRecoilState(campusState);
  const toggleActive = (key: number) => {
    setCampusId(key);
  };

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <>
      <PageTopBg>
        <Navbar func={toggleActive} />
        <UserInfos>
          {innerWidth > 1000 ? (
            <UserInfoCard
              type="pc"
              emoji={userInformation.emoji}
              nickname={userInformation.nickname}
              campus={campus[userInformation.campusId]}
            />
          ) : (
            <UserInfoCard
              type="mobile"
              emoji={userInformation.emoji}
              nickname={userInformation.nickname}
              campus={campus[userInformation.campusId]}
            />
          )}
          {innerWidth > 1000 ? (
            <UserInfoDetailCard
              type="pc"
              nickname={userInformation.nickname}
              mapcnt={userInformation.mapCnt}
              placecnt={userInformation.placeCnt}
              participatecnt={userInformation.participateCnt}
            />
          ) : (
            <UserInfoDetailCard
              type="mobile"
              nickname={userInformation.nickname}
              mapcnt={userInformation.mapCnt}
              placecnt={userInformation.placeCnt}
              participatecnt={userInformation.participateCnt}
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
    </>
  );
}

export default MyPage;