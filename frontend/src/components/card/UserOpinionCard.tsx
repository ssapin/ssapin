import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";

interface UserOpinionProps {
  emoji: string;
  content: string;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 6rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  .icon {
    position: absolute;
    width: 20rem;
    text-align: left;
    margin-bottom: 6rem;
    font-size: ${(props) => props.theme.fontSizes.h1};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .delete {
    position: absolute;
    text-align: right;
    margin-bottom: 3.5rem;
    margin-left: 19rem;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .content {
    margin-top: 0.8rem;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray800};
    font-family: ${(props) => props.theme.fontFamily.s1};
    z-index: 2;
  }
`;

function TogetherMapTitleCard({
  emoji,
  content,
  isAdmin,
  func,
}: UserOpinionProps) {
  return (
    <Container>
      <p className="icon">{emoji}</p>
      {isAdmin && (
        <div className="delete">
          <TrashIcon onClick={func} />
        </div>
      )}
      <p className="content">{content}</p>
    </Container>
  );
}

export default TogetherMapTitleCard;
