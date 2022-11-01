import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";

const PageTopBg = styled.div`
  width: auto;
  height: 48%;
  padding: ${pixelToRem(17)} ${pixelToRem(27)} ${pixelToRem(231)}
    ${pixelToRem(34)};
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: ${(props) => props.theme.colors.gray0};
`;

function MyPage() {
  return (
    <div>
      <PageTopBg>로고위치</PageTopBg>
      <PlaceRatingButton />
    </div>
  );
}

export default MyPage;
