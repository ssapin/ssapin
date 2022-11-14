import styled from "@emotion/styled";

type UserInfoDetailProps = {
  type: string;
  nickname: string;
  mapcnt: number;
  placecnt: number;
  participatecnt: number;
};

const Container = styled.div<{ type: string }>`
  width: ${(props) => (props.type === "pc" ? `40vw` : `90vw`)};
  height: ${(props) => (props.type === "pc" ? `27vh` : `17vh`)};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  align-items: center;

  .nickname {
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h3
        : props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.lightBlue};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h3bold
        : props.theme.fontFamily.h4bold};

    span {
      color: ${(props) => props.theme.colors.gray900};
      font-family: ${(props) =>
        props.type === "pc"
          ? props.theme.fontFamily.h3
          : props.theme.fontFamily.paragraph};
    }
  }

  .map {
    width: ${(props) => (props.type === "pc" ? `70%` : `90%`)};
    color: ${(props) => props.theme.colors.lightBlue};
    text-align: left;
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h5
        : props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h5
        : props.theme.fontFamily.s1};

    span {
      color: ${(props) => props.theme.colors.mainBlue};
      font-family: ${(props) =>
        props.type === "pc"
          ? props.theme.fontFamily.h5bold
          : props.theme.fontFamily.s1bold};
    }
  }

  .place {
    width: ${(props) => (props.type === "pc" ? `70%` : `90%`)};
    text-align: left;
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h5
        : props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h5
        : props.theme.fontFamily.s1};

    span {
      color: ${(props) => props.theme.colors.mainBlue};
      font-family: ${(props) =>
        props.type === "pc"
          ? props.theme.fontFamily.h5bold
          : props.theme.fontFamily.s1bold};
    }
  }

  .user {
    width: ${(props) => (props.type === "pc" ? `70%` : `90%`)};
    text-align: left;
    font-size: ${(props) =>
      props.type === "pc"
        ? props.theme.fontSizes.h5
        : props.theme.fontSizes.s1};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) =>
      props.type === "pc"
        ? props.theme.fontFamily.h5
        : props.theme.fontFamily.s1};

    span {
      color: ${(props) => props.theme.colors.mainBlue};
      font-family: ${(props) =>
        props.type === "pc"
          ? props.theme.fontFamily.h5bold
          : props.theme.fontFamily.s1bold};
    }
  }
`;

function UserInfoDetailCard({
  type,
  nickname,
  mapcnt,
  placecnt,
  participatecnt,
}: UserInfoDetailProps) {
  return (
    <Container type={type}>
      <div className="nickname">
        {nickname}
        <span> 님은요 ... 🧐</span>
      </div>
      <p className="map">
        🤩 지금까지 총 <span>{mapcnt}</span> 개의 지도를 제작하셨어요 !
      </p>
      <p className="place">
        📌 장소를 <span>{placecnt}</span> 개나 찍으셨네요 !
      </p>
      <p className="user">
        🥳 <span>{participatecnt}</span> 명 싸핀러의 지도에 참여하셨군요 !
      </p>
    </Container>
  );
}

export default UserInfoDetailCard;
