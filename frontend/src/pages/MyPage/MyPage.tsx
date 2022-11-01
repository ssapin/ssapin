import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import logoImg from "../../assets/image/ssapin_logo.png";
import CampusButton from "../../components/Buttons/CampusButton";
import UserInfoCard from "../../components/card/UserInfoCard";
import UserInfoDetailCard from "../../components/card/UserInfoDetailCard";
import SwitchButton from "../../components/Buttons/SwitchButton";

import MyPageTab from "./Tabs";

const PageTopBg = styled.div`
  width: auto;
  height: 48%;
  padding: ${pixelToRem(17)} ${pixelToRem(27)} ${pixelToRem(231)}
    ${pixelToRem(34)};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.gray0};
`;

const ChoiceText = styled.span`
  width: 54px;
  height: 18px;
  flex-grow: 0;
  margin: 5px;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: 1.13;
  letter-spacing: ${pixelToRem(-0.8)};
  text-align: center;
  color: ${(props) => props.theme.colors.mainYellow}; ;
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
`;

function MyPage() {
  return (
    <div>
      <PageTopBg>
        <div className="logo-group">
          <a href="https://google.com">
            <img src={logoImg} width="154" height="52" alt="SSAPIN_LOGO" />
          </a>
          <ChoiceText>선택 ▼</ChoiceText>
          <CampusButton />
        </div>
        <UserInfos>
          <UserInfoCard
            type="pc"
            emoji="🧛‍♂️"
            nickname="허설래미저쩔래미"
            campus="서울"
          />
          <UserInfoDetailCard
            type="pc"
            nickname="허설래미저쩔래미"
            mapcnt={35}
            placecnt={35}
            participatecnt={3500}
          />
        </UserInfos>
      </PageTopBg>
      <MyPageTab />
    </div>
  );
}

export default MyPage;
