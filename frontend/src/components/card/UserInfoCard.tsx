import styled from "@emotion/styled";
import UserProfileImge from "../etc/UserProfileImage";

type UserInfoProps = {
  emoji: string;
  nickname: string;
  campus: string;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
};

const Container = styled.article`
  width: 50%;
  height: 200px;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  padding: 1rem 2rem;
  gap: 1rem;
  ${(props) => props.theme.mq.tablet} {
    padding: 1rem;
  }

  ${(props) => props.theme.mq.mobile} {
    width: 100%;
    height: 143px;
    padding: 1rem;
  }
`;

const EmojiContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  > button {
    text-align: right;
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s1};
    top: 0;
    right: 0;
    position: absolute;
  }
  > div {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    p {
      font-size: ${(props) => props.theme.fontSizes.h5};
      color: ${(props) => props.theme.colors.mainNavy};
      font-family: ${(props) => props.theme.fontFamily.h5};
    }
  }
`;

function UserInfoCard({ emoji, nickname, campus, func }: UserInfoProps) {
  return (
    <Container>
      <EmojiContainer>
        <UserProfileImge emoji={emoji} />
      </EmojiContainer>
      <InfoContainer>
        <button type="button" onClick={func}>
          수정
        </button>
        <div>
          <p>닉네임 : {nickname}</p>
          <p>캠퍼스 : {campus}</p>
        </div>
      </InfoContainer>
    </Container>
  );
}

export default UserInfoCard;
