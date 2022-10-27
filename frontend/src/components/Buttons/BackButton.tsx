import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { pixelToRem } from "../../utils/functions/util";

const BackBtnBg = styled.button`
  position: relative;
  width: 9.833795013850416vh;
  height: 9.279778393351801vh;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .arrow-head {
    width: 4.1551246537396125vh;
    height: 4.1551246537396125vh;
    flex-grow: 0;
    transform: rotate(225deg);
    border-top: 0.4155124653739612vh solid
      ${(props) => props.theme.colors.gray0};
    border-right: 0.4155124653739612vh solid
      ${(props) => props.theme.colors.gray0};
    position: absolute;
    left: 2.811634349030471vh;
    top: 2.4930747922437675vh;
  }
  .arrow-body {
    position: absolute;
    width: 4.986149584487535vh;
    height: 0.4155124653739612vh;
    flex-grow: 0;
    bottom: 4.529085872576178vh;
    right: 2.4930747922437675vh;
    background-color: ${(props) => props.theme.colors.gray0};
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
