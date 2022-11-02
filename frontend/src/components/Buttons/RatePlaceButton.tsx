import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

// 이 부분은 아이폰 반응 이모지이긴한데 어떻게 넣는지를 몰라서 ㅠ-ㅠ
import { ReactComponent as GoodEmojiIcon } from "../../assets/svgs/good.svg";
import { ReactComponent as NormalEmojiIcon } from "../../assets/svgs/normal.svg";
import { ReactComponent as BadEmojiIcon } from "../../assets/svgs/bad.svg";

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  .active {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

const StyledEmotion = styled.button`
  width: 7.695290858725762vh;
  padding: 10px 0;
  margin: 6px;
  flex-grow: 0;
  margin: 0 ${pixelToRem(20)} 0 0;
  padding: ${pixelToRem(12)};
  border-radius: ${pixelToRem(15)};
  box-shadow: 4px 4px 13px 0 rgba(177, 177, 177, 0.6);
  background-color: ${(props) => props.theme.colors.gray0};
  .emoji {
    width: ${pixelToRem(45)};
    height: ${pixelToRem(45)};
  }
  flex-grow: 0;
  font-size: 4vh;
  line-height: 1.21;
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

export default function PlaceRatingButton() {
  const [ratePlace, setRatePlace] = useState("");

  const countPerson = [
    { key: "1", value: "😄" },
    { key: "2", value: "🙄" },
    { key: "3", value: "😡" },
  ];

  const toggleActive = (key: string) => {
    setRatePlace(key);
    console.log(key);
  };
  return (
    <TiedBoxes>
      {countPerson.map((el) => {
        return (
          <StyledEmotion
            value={el.value}
            className={`${ratePlace === el.key ? "active" : ""}`}
            onClick={() => toggleActive(el.key)}
          >
            {el.value}
          </StyledEmotion>
        );
      })}
    </TiedBoxes>
  );
}
