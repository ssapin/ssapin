import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import BackButton from "../../components/Buttons/BackButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { BigYellowButton } from "../../components/Buttons/YellowButton";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import PlaceDetailButton from "../../components/Buttons/PlaceDetailButton";
import CampusButton from "../../components/Buttons/CampusButton";
import MenuButton from "../../components/Buttons/MenuButton";

const PageTopBg = styled.div`
  width: auto;
  height: 48%;
  margin: 0 0 ${pixelToRem(207)};
  padding: ${pixelToRem(17)} ${pixelToRem(27)} ${pixelToRem(231)}
    ${pixelToRem(34)};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.gray0};
`;

// const ExampleBox = styled.div`
//   width: 50%;
//   display: flex;
//   justify-content: space-around;
// `;

function MyPage() {
  return (
    <div>
      <PageTopBg>로고위치</PageTopBg>
      <MenuButton />
      <CampusButton />
      <PlaceDetailButton type="button" />
      <PlaceRatingButton />
      <MapCircleButton type="button" shape="1" />
      <ShowMoreButton />
      <BackButton />
      <ConfirmButton type="button" text="카카오 지도로 자세히 보기" />
      <CancelButton type="button" text="취소" />
      {/* <SwitchOptionButton textLeft="장소" textRight="지도" /> */}
      {/* <YellowButton type="button" text="필터링" /> */}
      <BigYellowButton
        type="button"
        text1="129개의 핀잇!"
        text2="지금 참여하러 가기"
      />
      <CreateButtonMobile type="button" />
      <MoveToTopButton />
      <CreateButton type="button" text="장소 추가하기" />
    </div>
  );
}

export default MyPage;
