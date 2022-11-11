import styled from "@emotion/styled";
import React, { useState } from "react";
import MenuButton from "../Buttons/MenuButton";
import Navbar from "./Navbar";

const MenuContainer = styled.div`
  height: fit-content;
  position: absolute;
  right: 0;
  padding-right: inherit;

  ${(props) => props.theme.mq.mobile} {
    /* width: 14.5%; */
  }
`;

const Page = styled.div`
  position: fixed;
  width: 100%;
  height: 130vh;
  background-color: black;
  opacity: 0.5;
  z-index: 3;
  top: 0;
  left: 0;
`;

function NavToggleContainer() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <MenuContainer>
        <MenuButton func={showSidebar} />
      </MenuContainer>
      <Navbar sidebar={sidebar} func={showSidebar} />
      {sidebar && <Page onClick={showSidebar} />}
    </>
  );
}

export default NavToggleContainer;
