import styled from "@emotion/styled";
import UserProfileImge from "../etc/UserProfileImage";

type UserInfoProps = {
  type: string;
  emoji: string;
  nickname: string;
  campus: string;
  // eslint-disable-next-line react/require-default-props
  func?: () => void;
};

const Container = styled.div<{ type: string }>`
  width: ${(props) => (props.type === "pc" ? `40vw` : `90vw`)};
  height: ${(props) => (props.type === "pc" ? `27vh` : `17vh`)};
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
`;

const EmojiContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div<{ type: string }>`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;

  .edit {
    height: 20%;
    text-align: right;
    padding-right: 1rem;
    font-size: ${(props) => props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s1};
    background-color: transparent;
  }

  .nickname {
    height: 35%;
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h3
        : props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h3bold
        : props.theme.fontFamily.h5bold};
  }

  .campus {
    height: 35%;
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h3
        : props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h3bold
        : props.theme.fontFamily.h5bold};
  }
`;

function UserInfoCard({ type, emoji, nickname, campus, func }: UserInfoProps) {
  return (
    <Container type={type}>
      <EmojiContainer>
        {type === "pc" ? (
          <UserProfileImge size={150} emoji={emoji} />
        ) : (
          <UserProfileImge size={95} emoji={emoji} />
        )}
      </EmojiContainer>
      <InfoContainer type={type}>
        <button type="button" className="edit" onClick={func}>
          수정
        </button>
        <p className="nickname">닉네임 : {nickname}</p>
        <p className="campus">캠퍼스 : {campus}</p>
      </InfoContainer>
    </Container>
  );
}

export default UserInfoCard;
