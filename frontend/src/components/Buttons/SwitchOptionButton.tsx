import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const TiedBoxes = styled.div`
  width: 323.6px;
  height: 41.9px;
  padding: 0 11.6px 0 0;
  border-radius: ${pixelToRem(15)};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  .active {
    background-color: ${(props) => props.theme.colors.lightBlue};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    color: ${(props) => props.theme.colors.gray0};
  }
`;

const StyledGroup = styled.button`
  height: 41.9px;
  margin-right: ${pixelToRem(12)};
  flex-grow: 0;
  border-radius: ${pixelToRem(15)};
  font-family: ${(props) => props.theme.fontFamily.paragraph};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: 0;
  letter-spacing: ${pixelToRem(-0.8)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
`;

export default function CountPersonButton() {
  const countPerson = ["👤 1인", "👥 다수"];

  const [btnActive, setBtnActive] = useState("1인");

  const toggleActive = (name: string) => {
    setBtnActive(name);
    console.log(name);
  };
  return (
    <TiedBoxes>
      {countPerson.map((name, idx) => {
        return (
          <StyledGroup
            value={idx}
            className={`${btnActive === name ? "active" : ""}`}
            onClick={() => toggleActive(name)}
          >
            {name}
          </StyledGroup>
        );
      })}
    </TiedBoxes>
  );
}
