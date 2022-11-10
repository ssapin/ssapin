import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { userInformationState } from "../../store/atom";
import { RATING_LIST } from "../../utils/constants/contant";
import { IReview } from "../../utils/types/review.interface";

interface UserOpinionProps {
  review: IReview;
  // eslint-disable-next-line react/require-default-props
  func?: (e: any) => void;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 90%;
  height: 5rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  .content {
    margin-left: 1rem;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray800};
    font-family: ${(props) => props.theme.fontFamily.s1};
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-top: -2rem;
  .icon {
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
  }

  .delete {
    margin-top: 1.5rem;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    :hover {
      scale: 1.06;
      cursor: pointer;
    }
  }
`;

function UserOpinionCard({ review, func }: UserOpinionProps) {
  const user = useRecoilValue(userInformationState);
  const emogiList = RATING_LIST;
  return (
    <Container>
      <EmojiContainer>
        <p className="icon">
          {review === null ? "" : emogiList[review.emojiType]}
        </p>
        {review !== null && user.userId === review.userId && (
          <div className="delete">
            <TrashIcon onClick={() => func(review.reviewId)} />
          </div>
        )}
      </EmojiContainer>
      <p className="content">
        {review === null ? "등록된 리뷰가 없습니다." : review.content}
      </p>
    </Container>
  );
}

export default UserOpinionCard;
