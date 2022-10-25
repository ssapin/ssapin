import React from "react";
import styled from "@emotion/styled";

const PageTopBg = styled.div`
  width: auto;
  height: 48%;
  margin: 0 0 207px;
  padding: 17px 27px 231px 34px;
  background-color: ${(props) => props.theme.colors.mainBlue};
  color: white;
`;

function MyPage() {
  return (
    <div>
      <PageTopBg>로고위치</PageTopBg>
    </div>
  );
}

export default MyPage;
