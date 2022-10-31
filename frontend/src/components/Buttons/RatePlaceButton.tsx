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
    font-size: ${(props) => props.theme.fontSizes.h1};
    width: ${pixelToRem(45)};
    height: ${pixelToRem(45)};
  }
`;

export default function PlaceRatingButton() {
  const [ratingPlace, setRatingPlace] = useState("");

  const ratePlace = [
    { key: "1", value: "😄", checked: false },
    { key: "2", value: "🙄", checked: false },
    { key: "3", value: "😡", checked: false },
  ];

  const onChangeMenu = (checked: any, item: any) => {
    if (checked) {
      setRatingPlace([item]);
      console.log(ratingPlace);
    } else if (!checked) {
      setRatingPlace(ratingPlace.filter((el: any) => el !== item));
      console.log(ratingPlace);
    }
  };

  return (
    <TiedBoxes>
      {ratePlace.map((el) => (
        <WhiteSquareBox
          key={el.key}
          value={el.value}
          onChange={(e) => {
            onChangeMenu(e.target.checked, e.target.value);
          }}
          checked={ratingPlace.includes(el.value)}
        >
          <span className="emoji">{el.value}</span>
        </WhiteSquareBox>
      ))}
    </TiedBoxes>
  );
}
