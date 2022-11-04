import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const TiedBoxes = styled.div`
  display: block;
  //height: 523.2px;
  padding-left: 10px;
`;
const TagName = styled.span<{ type?: string }>`
  width: 62px;
  height: 29px;
  margin: 10px;
  flex-grow: 0;
  line-height: 1.21;
  letter-spacing: ${pixelToRem(-1.2)};
  text-align: left;
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) =>
    props.type === "create"
      ? props.theme.fontFamily.h5
      : props.theme.fontFamily.h3};
  font-size: ${(props) =>
    props.type === "create"
      ? props.theme.fontSizes.h5
      : props.theme.fontSizes.h3};
`;
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

type Filterprops = {
  // eslint-disable-next-line react/require-default-props
  type?: string;
  // eslint-disable-next-line react/require-default-props
  func?: (item: any, check: any) => void;
  hashTag: number[];
};

export default function FilterChoiceButton({
  type,
  func,
  hashTag,
}: Filterprops) {
  const countPerson = [
    { key: 1, value: "👤 1인", checked: false, index: 0 },
    { key: 2, value: "👥 다수", checked: false, index: 0 },
  ];

  const featureData = [
    { key: 3, value: "🔕 조용한", checked: false, index: 0 },
    { key: 4, value: "🌞 햇살좋은", checked: false, index: 0 },
    { key: 5, value: "📢 붐비는", checked: false, index: 0 },
    { key: 6, value: "🧹 깔끔한", checked: false, index: 0 },
    { key: 7, value: "👖 빈티지", checked: false, index: 0 },
    { key: 8, value: "📷 인스타감성", checked: false, index: 0 },
    { key: 9, value: "💪 건강한", checked: false, index: 0 },
    { key: 10, value: "🚗 주차편한", checked: false, index: 0 },
    { key: 11, value: "🥅 넓은", checked: false, index: 0 },
    { key: 12, value: "🤵 친절한", checked: false, index: 0 },
    { key: 13, value: "🌉 경치좋은", checked: false, index: 0 },
    { key: 14, value: "🍲 푸짐한", checked: false, index: 0 },
    { key: 15, value: "😋 맛있는", checked: false, index: 0 },
    { key: 16, value: "💰 가성비", checked: false, index: 0 },
    { key: 17, value: "🌟 밝은", checked: false, index: 0 },
    { key: 18, value: "🔦 어두운", checked: false, index: 0 },
  ];

  const goalData = [
    { key: 19, value: "💬 대화", checked: false, index: 0 },
    { key: 20, value: "📖 공부", checked: false, index: 0 },
    { key: 21, value: "🎧 음악감상", checked: false, index: 0 },
    { key: 22, value: "🍻 회식", checked: false, index: 0 },
    { key: 23, value: "🚶 산책", checked: false, index: 0 },
    { key: 24, value: "👩‍💻 코딩", checked: false, index: 0 },
  ];

  const timeData = [
    { key: 25, value: "⛺ 24시간", checked: false, index: 0 },
    { key: 26, value: "🌅 아침일찍", checked: false, index: 0 },
    { key: 27, value: "🌃 밤늦게", checked: false, index: 0 },
  ];

  return (
    <TiedBoxes>
      <TagName type={type}># 인원</TagName>
      <OpenTag>
        {countPerson.map((el) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="checkbox" key={el.key}>
            <input
              type="checkbox"
              value={el.value}
              onChange={(e) => {
                func(e.target.checked, el.key);
              }}
              checked={hashTag.includes(el.key)}
            />
            <span className="checkbox_text">{el.value}</span>
          </label>
        ))}
      </OpenTag>
      <TagName type={type}># 특징</TagName>
      <OpenTag>
        {featureData.map((el) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="checkbox" key={el.key}>
            <input
              type="checkbox"
              value={el.value}
              onChange={(e) => {
                func(e.target.checked, el.key);
              }}
              checked={hashTag.includes(el.key)}
            />
            <span className="checkbox_text">{el.value}</span>
          </label>
        ))}
      </OpenTag>
      <TagName type={type}># 목적</TagName>
      <OpenTag>
        {goalData.map((el) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="checkbox" key={el.key}>
            <input
              type="checkbox"
              value={el.value}
              onChange={(e) => {
                func(e.target.checked, el.key);
              }}
              checked={hashTag.includes(el.key)}
            />
            <span className="checkbox_text">{el.value}</span>
          </label>
        ))}
      </OpenTag>
      <TagName type={type}># 시간</TagName>
      <OpenTag>
        {timeData.map((el) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label className="checkbox" key={el.key}>
            <input
              type="checkbox"
              value={el.value}
              onChange={(e) => {
                func(e.target.checked, el.key);
              }}
              checked={hashTag.includes(el.key)}
            />
            <span className="checkbox_text">{el.value}</span>
          </label>
        ))}
      </OpenTag>
    </TiedBoxes>
  );
}
