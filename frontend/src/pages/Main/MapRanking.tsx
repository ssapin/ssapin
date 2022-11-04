import styled from "@emotion/styled";
import MapCard from "../../components/card/MapCard";
import { IMap } from "../../utils/types/map.interface";

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: 1rem;
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};

    ${(props) => props.theme.mq.tablet} {
      padding-right: 0;
    }
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
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

type MapProps = {
  maps: IMap[];
};

function MapRanking({ maps }: MapProps) {
  return (
    <Container>
      <Title>
        🎉 <span>인기있는 추천지도</span>
      </Title>
      <Description>
        <p>장소가 제일 많이 등록된 추천지도들을 소개합니다 👍</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>
      <RankingContainer>
        {maps.length !== 0 &&
          maps.map((map, id) => (
            <MapCard
              // eslint-disable-next-line react/no-array-index-key
              key={id}
              prop={map}
              isAdmin={false}
            />
          ))}
        {maps?.length === 0 && <NoContainer>없어요</NoContainer>}
      </RankingContainer>
    </Container>
  );
}

export default MapRanking;
