import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const ToggleGroup = styled.div`
  width: fit-content;
  height: 30px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  margin: auto;
  border-radius: ${pixelToRem(15)};
  margin-bottom: 1.5rem;

  .inactive {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(15)};
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(15)};
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

export default function ToggleButton(props: {
  onClickLeft: () => void;
  onClickRight: () => void;
  textLeft:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  textRight:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [toggle, setToggle] = useState("off");

  function onClickLeft() {
    if (props && onClickLeft) onClickLeft();
    setToggle("off");
  }
  function onClickRight() {
    if (props && onClickRight) onClickRight();
    setToggle("on");
  }

  return (
    <ToggleGroup>
      <button
        type="button"
        className={toggle === "off" ? "active" : "inactive"}
        onClick={onClickLeft}
      >
        {textLeft}
      </button>
      <button
        type="button"
        className={toggle === "on" ? "active" : "inactive"}
        onClick={onClickRight}
      >
        {textRight}
      </button>
    </ToggleGroup>
  );
}
