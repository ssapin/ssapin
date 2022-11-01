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
  &:hover {
    background-color: ${(props) => props.theme.colors.subYellow};
  }
`;

export default function CampusButton() {
  const campus = [
    { key: "1", value: "서울" },
    { key: "2", value: "대전" },
    { key: "3", value: "광주" },
    { key: "4", value: "구미" },
    { key: "5", value: "부울경" },
  ];

  const [btnActive, setBtnActive] = useState("1");

  const toggleActive = (key: string) => {
    setBtnActive(key);
  };
  return (
    <TiedBoxes>
      {campus.map((el) => {
        return (
          <StyledCampus
            value={el.value}
            className={`${btnActive === el.key ? "active" : ""}`}
            onClick={() => toggleActive(el.key)}
          >
            {el.value}
          </StyledCampus>
        );
      })}
    </TiedBoxes>
  );
}
