import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { RATING_LIST } from "../../utils/constants/contant";

interface UserOpinionProps {
  emoji: number;
  content: string;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
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
  justify-content: center;
  padding: 1rem;

  .content {
    margin-left: 1rem;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray800};
    font-family: ${(props) => props.theme.fontFamily.s1};
  }
`;

const EmojiContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 10%;
  .icon {
    width: 20rem;
    text-align: left;
    margin-top: -2rem;
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .delete {
    text-align: right;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

function UserOpinionCard({ emoji, content, isAdmin, func }: UserOpinionProps) {
  const emogiList = RATING_LIST;
  return (
    <Container>
      <EmojiContainer>
        <p className="icon">{emogiList[emoji]}</p>
        {isAdmin && (
          <div className="delete">
            <TrashIcon onClick={func} />
          </div>
        )}
      </EmojiContainer>
      <p className="content">{content}</p>
    </Container>
  );
}

export default UserOpinionCard;
