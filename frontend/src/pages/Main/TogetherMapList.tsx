import styled from "@emotion/styled";
import TogetherMapCard from "../../components/card/TogetherMapCard";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 17vw;
  padding-right: 17vw;
  margin-top: 4rem;

  ${(props) => props.theme.mq.mobile} {
    padding-left: 7vw;
    padding-right: 7vw;
  }
`;

const RankingContainer = styled.div`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: left;

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 0;
  }
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NoContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
`;

type TogetherMapProps = {
  maps: ITogetherMap[];
};

function TogetherMapList({ maps }: TogetherMapProps) {
  return (
    <Container>
      <Title>
        🎪 <span>모여지도</span>
      </Title>
      <Description>
        테마별 자신의 베스트 1위! 장소를 등록해보세요 🥳
      </Description>
      <RankingContainer>
        {maps.length !== 0 &&
          maps.map((map, id) => (
            <TogetherMapCard
              // eslint-disable-next-line react/no-array-index-key
              key={id}
              prop={map}
            />
          ))}
        {maps?.length === 0 && <NoContainer>없어요</NoContainer>}
      </RankingContainer>
    </Container>
  );
}

export default TogetherMapList;
