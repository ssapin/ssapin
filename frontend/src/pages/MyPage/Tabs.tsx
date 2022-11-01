import React, { useState } from "react";
import styled from "@emotion/styled";
import MyBookmark from "./MyPageBookmark";
import MyMaps from "./MyPageMaps";
import { pixelToRem } from "../../utils/functions/util";

const TabBackground = styled.div`
  background-color: ${(props) => props.theme.colors.mainBlue};
`;

const TabMenu = styled.div`
  display: flex;
  margin: 0 10%;
  text-align: center;
  transition: all 0.2s ease;
  line-height: 1.22;
  letter-spacing: ${pixelToRem(-1.2)};
  position: relative;
  .non-checked {
    width: 50%;
    border-radius: ${pixelToRem(20)} ${pixelToRem(20)} 0 0;
    padding: 20px;
    cursor: pointer;
    font-family: ${(props) => props.theme.fontFamily.h1};
    font-size: ${(props) => props.theme.fontSizes.h1};
    background-color: ${(props) => props.theme.colors.mediumBlue};
    color: ${(props) => props.theme.colors.gray500};
  }
  .checked {
    width: 50%;
    border-radius: ${pixelToRem(20)} ${pixelToRem(20)} 0 0;
    padding: 20px;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray0};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    font-size: ${(props) => props.theme.fontSizes.h1};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Contentdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const myPageTab = [
  {
    title: "내 지도",
    content: <MyMaps />,
  },
  {
    title: "북마크",
    content: <MyBookmark />,
  },
];

function MyPageTab() {
  const [currentTab, setCurrentTab] = useState(0);

  const selectTabHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <Container>
      <TabBackground>
        <TabMenu>
          {myPageTab.map((el, index) => {
            return (
              <label
                key={index}
                className={currentTab === index ? "checked" : "non-checked"}
                onClick={() => selectTabHandler(index)}
              >
                {el.title}
              </label>
            );
          })}
        </TabMenu>
      </TabBackground>
      <Contentdiv>{myPageTab[currentTab].content}</Contentdiv>
    </Container>
  );
}

export default MyPageTab;
