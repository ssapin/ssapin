import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as GoodEmojiIcon } from "../../assets/svgs/good.svg";
import { ReactComponent as NormalEmojiIcon } from "../../assets/svgs/normal.svg";
import { ReactComponent as BadEmojiIcon } from "../../assets/svgs/bad.svg";

const OpenTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  font-family: ${(props) => props.theme.fontFamily.paragraph};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  .checkbox input {
    display: none;
  }
  .checkbox {
    display: flex;
    margin: 0px 5px 5px 0px;
  }
  .checkbox_text {
    display: flex;
    background-color: ${(props) => props.theme.colors.lightLightBlue};
    margin-left: 10px;
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.gray500};
    padding: 7px 20px;
    border-radius: ${pixelToRem(15)};
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.lightBlue};
      color: ${(props) => props.theme.colors.gray0};
    }
  }
  .checkbox input:checked + .checkbox_text {
    color: ${(props) => props.theme.colors.gray0};
    background-color: ${(props) => props.theme.colors.lightBlue};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  }
`;

export default function PlaceRatingButton() {
  const [hashTag, setHashTag] = useState([]);

  const countPerson = [
    { key: "1", value: "😄", checked: false },
    { key: "2", value: "🙄", checked: false },
    { key: "3", value: "😡", checked: false },
  ];

  const onChangeTag = (checked: any, item: any) => {
    if (checked) {
      setHashTag([...hashTag, item]);
      console.log(hashTag);
    } else if (!checked) {
      setHashTag(hashTag.filter((el: any) => el !== item));
      console.log(hashTag);
    }
  };

  return (
    <OpenTag>
      {countPerson.map((el) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className="checkbox" key={el.key}>
          <input
            type="checkbox"
            value={el.value}
            onChange={(e) => {
              onChangeTag(e.target.checked, e.target.value);
            }}
            checked={hashTag.includes(el.value)}
          />
          <span className="checkbox_text">{el.value}</span>
        </label>
      ))}
    </OpenTag>
  );
}
