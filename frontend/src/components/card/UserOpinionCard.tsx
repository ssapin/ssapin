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
  width: 100%;
  height: 100%;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

const Content = styled.div`
  margin-left: 1rem;
  text-align: left;
  font-size: ${(props) => props.theme.fontSizes.s1};
  color: ${(props) => props.theme.colors.gray800};
  font-family: ${(props) => props.theme.fontFamily.s1};
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DeleteButton = styled.button`
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fontFamily.h4bold};

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  margin-top: -1.7rem;
  transition: all 0.2s ease-out;
  margin-bottom:0.3rem;
  }
`;
const Icon = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h2};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
`;

const UserNickName = styled.div`
  margin: 0.25rem 3% 0 auto;
  background-color: ${(props) => props.theme.colors.gray100};
  font-size: ${(props) => props.theme.fontSizes.s3};
  font-family: ${(props) => props.theme.fontFamily.s3};
`;

function UserOpinionCard({ review, func }: UserOpinionProps) {
  const user = useRecoilValue(userInformationState);

  return (
    <Container>
      <EmojiContainer>
        {review === null ? (
          <Icon />
        ) : (
          <Icon> {RATING_LIST[review.emojiType]}</Icon>
        )}
        <DeleteButton onClick={() => func(review.reviewId)}>
          <TrashIcon />
        </DeleteButton>
      </EmojiContainer>
      <Content>
        {review === null ? "등록된 리뷰가 없습니다." : review.content}
      </Content>
      <UserNickName>🪓 생산관리1팀생산관리1팀 </UserNickName>
    </Container>
  );
}

export default UserOpinionCard;
