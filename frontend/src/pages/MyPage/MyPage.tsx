import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import BackButton from "../../components/Buttons/BackButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";
import {
  YellowButton,
  BigYellowButton,
} from "../../components/Buttons/YellowButton";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import SwitchOptionButton from "../../components/Buttons/SwitchOptionButton";

const PageTopBg = styled.div`
  width: auto;
  height: 48%;
  margin: 0 0 ${pixelToRem(207)};
  padding: ${pixelToRem(17)} ${pixelToRem(27)} ${pixelToRem(231)}
    ${pixelToRem(34)};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.gray0};
`;

const ExampleBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;
`;

function MyPage() {
  return (
    <div>
      <PageTopBg>로고위치</PageTopBg>
      <BackButton />
      <ExampleBox>
        <ConfirmButton type="button" text="검색" />
        <CancelButton type="button" text="취소" />
        <SwitchOptionButton />
        {/* <YellowButton type="button" text="필터링" /> */}
        <BigYellowButton
          type="button"
          text1="129개의 핀잇!"
          text2="지금 참여하러 가기"
        />
      </ExampleBox>
      <MoveToTopButton />
      <CreateButton type="button" text="장소 추가하기" />
      <CreateButtonMobile type="button" />
    </div>
  );
}

export default MyPage;
