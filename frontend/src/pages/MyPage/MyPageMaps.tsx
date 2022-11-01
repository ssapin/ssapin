import React from "react";
import styled from "@emotion/styled";
import SwitchButton from "../../components/Buttons/SwitchButton";

function MyMaps() {
  // 스위치 + Tabs에서 쓰이는 전환버튼을 통해서 렌더링할 때 섞어서 코드 치기

  return (
    <div>
      <SwitchButton textLeft="작성" textRight="참여" />
    </div>
  );
}

export default MyMaps;
