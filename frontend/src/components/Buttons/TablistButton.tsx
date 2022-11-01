import React from "react";
import styled from "@emotion/styled";
import { ITabInfo } from "../../utils/interfaces/buttons.interface";

const TabBox = styled.div`
  position: fixed;
  width: 577px;
  height: 109.5px;
  flex-grow: 0;
  margin: 0 0 96.5px;
  background-color: #a3bed8;
`;

const TabListStyle = styled.div`
  .tabList {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .tabList li {
    display: inline-block;
    text-align: center;
    width: 49%;
  }
  .tabList li:first-child {
    border-right: 1px solid #ddd;
  }
  .tabList li a {
    display: block;
    color: #000;
    font-size: 1.6rem;
    line-height: 48px;
  }
  .tabList li a span {
    display: inline-block;
    padding: 0px 8px;
    width: 100%;
  }
  .tabList li a.on span {
    background-color: #999;
    color: #fff;
    font-weight: 700;
  }
`;

function Tab({ tabId, tabName, on }: ITabInfo) {
  const changeTab = (id: string) => {
    (
      document.querySelector(".tabList li a.on") as HTMLAnchorElement
    ).classList.remove("on");
    (
      document.querySelector(`.tabList li a#${id}`) as HTMLAnchorElement
    ).classList.add("on");
  };

  return (
    <li>
      <a
        href="#"
        id={tabId}
        className={on ? "on" : ""}
        onClick={() => changeTab(tabId)}
      >
        <span>{tabName}</span>
      </a>
    </li>
  );
}

function TabList() {
  const tabList: ITabInfo[] = [
    { tabName: "내 지도", tabId: "maps", on: true },
    { tabName: "북마크", tabId: "bookmark", on: false },
  ];

  return (
    <TabBox>
      <TabListStyle>
        {tabList.map((v: ITabInfo, inx: number) => {
          return <Tab key={inx} {...v} />;
        })}
      </TabListStyle>
    </TabBox>
  );
}

export default TabList;
