import styled from "@emotion/styled";

type UserInfoDetailProps = {
  nickname: string;
  mapcnt: number;
  placecnt: number;
  participatecnt: number;
};

const Container = styled.article`
  width: 50%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  align-items: center;

  ${(props) => props.theme.mq.mobile} {
    width: 100%;
    height: 143px;
    padding: 0.5rem;
  }
`;

const NicknameContainer = styled.div`
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.lightBlue};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  span {
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h3};
  }
  ${(props) => props.theme.mq.mobile} {
    font-size: ${(props) => props.theme.fontSizes.paragraph};
  }
`;

const TextContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  > p {
    width: 100%;
    text-align: left;
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.mainNavy};
    font-family: ${(props) => props.theme.fontFamily.h5};

    span {
      color: ${(props) => props.theme.colors.mainBlue};
      font-family: ${(props) => props.theme.fontFamily.h5bold};
    }
  }
  ${(props) => props.theme.mq.tablet} {
    > p {
      font-size: ${(props) => props.theme.fontSizes.s1};
      span {
        font-family: ${(props) => props.theme.fontFamily.s1bold};
      }
    }
  }
`;

function UserInfoDetailCard({
  nickname,
  mapcnt,
  placecnt,
  participatecnt,
}: UserInfoDetailProps) {
  return (
    <Container>
      <NicknameContainer>
        {nickname}
        <span> λμμ ... π§</span>
      </NicknameContainer>
      <TextContainer>
        <p>
          π€© μ§κΈκΉμ§ μ΄ <span>{mapcnt}</span> κ°μ μ§λλ₯Ό μ μνμ¨μ΄μ !
        </p>
        <p>
          π μ₯μλ₯Ό <span>{placecnt}</span> κ°λ μ°μΌμ¨λ€μ !
        </p>
        <p>
          π₯³ <span>{participatecnt}</span> λͺ μΈνλ¬μ μ§λμ μ°Έμ¬νμ¨κ΅°μ !
        </p>
      </TextContainer>
    </Container>
  );
}

export default UserInfoDetailCard;
