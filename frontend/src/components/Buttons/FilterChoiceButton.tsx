import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .active {
    background-color: ${(props) => props.theme.colors.mainYellow};
  }
`;

const StyledCampus = styled.button`
  width: ${pixelToRem(65)};
  height: ${pixelToRem(28)};
  flex-grow: 0;
  border-radius: ${pixelToRem(20)};
  flex-grow: 0;
  font-family: ${(props) => props.theme.fontFamily.s1};
  font-size: ${(props) => props.theme.fontSizes.s1};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.21;
  letter-spacing: ${pixelToRem(-0.7)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
`;

export default function CampusButton() {
  const makewith = ["1인", "다수"];
  // 여기 버튼을 어떻게 구현?
  // https://velog.io/@ken1204/Checkbox-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EA%B8%B0-React-Typescript-styled-components

  const [btnActive, setBtnActive] = useState("서울");

  const toggleActive = (name: string) => {
    setBtnActive(name);
    console.log(name);
  };
  return (
    <TiedBoxes>
      {campus.map((name, idx) => {
        return (
          <StyledCampus
            value={idx}
            className={`${btnActive === name ? "active" : ""}`}
            onClick={() => toggleActive(name)}
          >
            {name}
          </StyledCampus>
        );
      })}
    </TiedBoxes>
  );
}
