import { useState } from "react";
import styled from "@emotion/styled";

const ToggleGroup = styled.div`
  width: 350px;
  height: 41px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  border-radius: 10px;
  margin: 8px;
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    color: ${(props) => props.theme.colors.gray500};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  }
`;

type SwitchProps = {
  textLeft: string;
  textRight: string;
};

export default function SwitchButton({ textLeft, textRight }: SwitchProps) {
  const [type, setType] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeType = (type: number) => {
    setType(type);
  };
  return (
    <ToggleGroup>
      <button
        type="button"
        className={type === 0 ? "active" : "inactive"}
        onClick={() => changeType(0)}
      >
        {textLeft}
      </button>
      <button
        type="button"
        className={type === 1 ? "active" : "inactive"}
        onClick={() => changeType(1)}
      >
        {textRight}
      </button>
    </ToggleGroup>
  );
}
