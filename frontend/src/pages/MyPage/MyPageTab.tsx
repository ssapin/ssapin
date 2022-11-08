import { useState } from "react";
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
    font-family: ${(props) => props.theme.fontFamily.h2};
    font-size: ${(props) => props.theme.fontSizes.h2};
    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.paragraph};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      padding: 10px;
    }
    ${(props) => props.theme.mq.tablet} {
      font-family: ${(props) => props.theme.fontFamily.h3};
      font-size: ${(props) => props.theme.fontSizes.h3};
      padding: 15px;
    }
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
    font-family: ${(props) => props.theme.fontFamily.h2bold};
    font-size: ${(props) => props.theme.fontSizes.h2};
    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.paragraphbold};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      padding: 10px;
    }
    ${(props) => props.theme.mq.tablet} {
      font-family: ${(props) => props.theme.fontFamily.h3bold};
      font-size: ${(props) => props.theme.fontSizes.h3};
      padding: 15px;
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Contentdiv = styled.div`
  width: 80%;
  margin: 0 10%;
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
              // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <label
                // eslint-disable-next-line react/no-array-index-key
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
