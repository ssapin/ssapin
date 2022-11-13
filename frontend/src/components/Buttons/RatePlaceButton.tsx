import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { RATING_LIST } from "../../utils/constants/contant";

const TiedBoxes = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  align-items: center;
  margin: auto;
  .active {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

const StyledEmotion = styled.button`
  width: 70px;
  height: 70px;
  padding: 10px 0;
  flex-grow: 0;
  border-radius: ${pixelToRem(15)};
  box-shadow: 4px 4px 13px 0 rgba(177, 177, 177, 0.6);
  background-color: ${(props) => props.theme.colors.gray0};
  flex-grow: 0;
  font-size: 160%;
  line-height: 1.21;
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightBlue};
  }
`;

type RatingProps = {
  ratePlace: number;
  // eslint-disable-next-line react/require-default-props
  func?: (e: number) => void;
};

function PlaceRatingButton({ ratePlace, func }: RatingProps) {
  const REVIEW_EMOJI = RATING_LIST;
  return (
    <TiedBoxes>
      {REVIEW_EMOJI.map(
        (el, id) =>
          id >= 1 && (
            <StyledEmotion
              // eslint-disable-next-line react/no-array-index-key
              key={id}
              type="button"
              onClick={() => func(id)}
              className={`${ratePlace === id ? "active" : ""}`}
            >
              {el}
            </StyledEmotion>
          ),
      )}
    </TiedBoxes>
  );
}

export default PlaceRatingButton;
