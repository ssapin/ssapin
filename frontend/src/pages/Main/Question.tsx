import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { BigYellowButton } from "../../components/Buttons/YellowButton";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

type QuestionProps = {
  item: ITogetherMap;
};

const QuestionContainer = styled.div`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  > p {
    font-size: ${(props) => props.theme.fontSizes.h1};
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    word-break: keep-all;

    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.h4};
    }
  }

  button {
    margin-bottom: 30px;
  }
`;

function Question({ item }: QuestionProps) {
  const placeText = `${item.userCnt}개의 장소들!`;
  const navigate = useNavigate();
  const moveToTogetherMap = () => {
    navigate(`/togethermaps/${item.togethermapId}/detail`);
  };

  return (
    <QuestionContainer>
      <p>{item.emoji}</p>
      <p>{item.question}</p>
      <BigYellowButton
        type="button"
        text1={placeText}
        text2="참여하러 가기"
        func={moveToTogetherMap}
      />
    </QuestionContainer>
  );
}

export default Question;
