import styled from "@emotion/styled";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import MapCard from "../../components/card/MapCard";
import { IMap } from "../../utils/types/map.interface";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 19vw;
  padding-right: 19vw;
  margin-top: 4rem;

  ${(props) => props.theme.mq.mobile} {
    padding-left: 7vw;
    padding-right: 7vw;
  }

  ${(props) => props.theme.mq.pc} {
    padding-left: 14vw;
    padding-right: 14vw;
  }
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
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

type MapProps = {
  maps: IMap[];
};

function MapList({ maps }: MapProps) {
  return (
    <Container>
      <Title>
        🗺 <span>추천지도</span>
      </Title>
      <Description>
        싸핀러들에게 알리고 싶은 장소를 나만의 추천지도에 마구마구 등록해보세요
        🤩
      </Description>
      <RankingContainer>
        {maps.length !== 0 &&
          maps.map(
            (map, id) =>
              id <= 2 && (
                <MapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  icon={map.mapEmoji}
                  title={map.title}
                  user={`${map.userEmoji} ${map.nickname}`}
                  placecnt={map.placeCnt}
                  usercnt={map.userCnt}
                />
              ),
          )}
        {maps?.length === 0 && <NoContainer>없어요</NoContainer>}
      </RankingContainer>
      <RankingContainer>
        {maps.length >= 3 &&
          maps.map(
            (map, id) =>
              id >= 3 && (
                <MapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  icon={map.mapEmoji}
                  title={map.title}
                  user={`${map.userEmoji} ${map.nickname}`}
                  placecnt={map.placeCnt}
                  usercnt={map.userCnt}
                />
              ),
          )}
      </RankingContainer>
      <ShowMoreButton />
    </Container>
  );
}

export default MapList;
