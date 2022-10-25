import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

// 타입 지정해주기
interface IBackButton {
  type: "button" | undefined;
  onClick: (e: React.MouseEvent) => void;
}

const BackBtnBg = styled.button`
  position: relative;
  width: 71px;
  height: 67px;
  margin: 2px 5px 29px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .arrow-head {
    width: 30px;
    height: 30px;
    flex-grow: 0;
    transform: rotate(225deg);
    border-top: 3px solid #ffffff;
    border-right: 3px solid #ffffff;
    position: absolute;
    left: 20.3px;
    top: 18px;
  }
  .arrow-body {
    position: absolute;
    width: 36px;
    height: 3px;
    flex-grow: 0;
    bottom: 32.7px;
    right: 18px;
    background-color: ${(props) => props.theme.colors.gray50};
  }
`;

export default function BackButton() {
  const navigate = useNavigate();

  const moveBack = () => {
    console.log("뒤로가기 눌림");
    navigate(-1);
  };

  return (
    <BackBtnBg onClick={moveBack}>
      <div className="arrow-head" />
      <div className="arrow-body" />
    </BackBtnBg>
  );
}
