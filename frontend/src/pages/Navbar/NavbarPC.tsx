import styled from "@emotion/styled";
import React, { useState } from "react";
import MenuButton from "../../components/Buttons/MenuButton";
import Logo from "../../assets/image/ssapin_logo.png";
import CampusButton from "../../components/Buttons/CampusButton";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.mainBlue};
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem;
`;

const CampusContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LogoContainer = styled.div`
  width: fit-content;
  height: 50%;
  display: flex;
  flex-direction: ;
  justify-content: center;
  margin-bottom: 0.7rem;
  img {
    width: auto;
    height: 100%;
  }
  button {
    margin-top: 1rem;
    margin-left: 0.5rem;
    background-color: transparent;
    decoration: none;
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.subYellow};
  }
  button: hover {
    scale: 1.1;
    cursor: pointer;
  }
`;
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  const [btnActive, setBtnActive] = useState(1);
  const toggleActive = (key: number) => {
    setBtnActive(key);
  };
  const campus = ["0", "서울", "대전", "광주", "구미", "부울경"];

  return (
    <Container>
      <CampusContainer>
        <LogoContainer>
          <img alt="ssapin_logo.png" src={Logo} />
          <button type="button" onClick={toggleSide}>
            {campus[btnActive]} ▼
          </button>
        </LogoContainer>
        {isOpen && (
          <CampusButton
            setIsOpen={toggleSide}
            setBtnActive={toggleActive}
            campusId={btnActive}
          />
        )}
      </CampusContainer>
      <MenuButton />
    </Container>
  );
}
