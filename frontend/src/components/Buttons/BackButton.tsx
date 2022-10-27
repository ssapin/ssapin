import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { pixelToRem } from "../../utils/functions/util";

const BackBtnBg = styled.button`
  position: relative;
  width: ${pixelToRem(71)};
  height: ${pixelToRem(67)};
  margin: ${pixelToRem(2)} ${pixelToRem(5)} ${pixelToRem(29)} 0;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .arrow-head {
    width: ${pixelToRem(30)};
    height: ${pixelToRem(30)};
    flex-grow: 0;
    transform: rotate(225deg);
    border-top: ${pixelToRem(3)} solid #ffffff;
    border-right: ${pixelToRem(3)} solid #ffffff;
    position: absolute;
    left: ${pixelToRem(20.3)};
    top: ${pixelToRem(18)};
  }
  .arrow-body {
    position: absolute;
    width: ${pixelToRem(36)};
    height: ${pixelToRem(3)};
    flex-grow: 0;
    bottom: ${pixelToRem(32.7)};
    right: ${pixelToRem(18)};
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
