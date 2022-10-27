import { React, useState } from "react";
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

export default function SwitchOptionButton({
  text1,
  text2,
  toggle,
}: MoreTextProps) {
  const [toggle, setToggle] = useState(0);

  const changeType = (toggle: number) => {
    setToggle(toggle);
  };
  return (
    <ToggleGroup>
      <button
        type="button"
        className={toggle === 0 ? "active" : "inactive"}
        onClick={() => changeType(0)}
      >
        {text1}
      </button>
      <button
        type="button"
        className={toggle === 1 ? "active" : "inactive"}
        onClick={() => changeType(1)}
      >
        {text2}
      </button>
    </ToggleGroup>
  );
}
