import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as GoodEmojiIcon } from "../../assets/svgs/good.svg";
import { ReactComponent as NormalEmojiIcon } from "../../assets/svgs/normal.svg";
import { ReactComponent as BadEmojiIcon } from "../../assets/svgs/bad.svg";

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .active {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

const WhiteSquareBox = styled.button`
  width: ${pixelToRem(70)};
  height: ${pixelToRem(68)};
  flex-grow: 0;
  margin: 0 ${pixelToRem(20)}; 0 0;
  padding: ${pixelToRem(12)};
  border-radius: ${pixelToRem(15)};
  box-shadow: 4px 4px 13px 0 rgba(177, 177, 177, 0.6);
    background-color: ${(props) => props.theme.colors.gray0};
  .emoji {
    width: ${pixelToRem(45)};
    height: ${pixelToRem(45)};
  }
`;

export default function PlaceRatingButton() {
  const rated = ["Good", "Normal", "Bad"];

  const [btnActive, setBtnActive] = useState("");

  const toggleActive = (rate: string) => {
    setBtnActive(rate);
    console.log(rate);
  };
  return (
    <TiedBoxes>
      {rated.map((rate, idx) => {
        return (
          <WhiteSquareBox
            type="button"
            value={idx}
            className={`${btnActive === rate ? "active" : ""}`}
            onClick={() => toggleActive(rate)}
          >
            {rate === "Good" && <GoodEmojiIcon className="emoji" />}
            {rate === "Normal" && <NormalEmojiIcon className="emoji" />}
            {rate === "Bad" && <BadEmojiIcon className="emoji" />}
          </WhiteSquareBox>
        );
      })}
    </TiedBoxes>
  );
}
