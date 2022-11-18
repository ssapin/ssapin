import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import MapCard from "../../components/card/MapCard";
import { campusState } from "../../store/atom";
import { fadeIn } from "../../styles/animations";
import axiosInstance from "../../utils/apis/api";
import { MAP_APIS } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
  animation: ${fadeIn} 1s ease-in forwards;
`;

const RankingContainer = styled.div`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;

  ${(props) => props.theme.mq.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  ${(props) => props.theme.mq.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
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

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
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
    font-size: ${(props) => props.theme.fontSizes.s1};
    font-family: ${(props) => props.theme.fontFamily.s1};

    ${(props) => props.theme.mq.tablet} {
      padding-right: 0;
    }

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s1};
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
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

function MapRanking() {
  const campusId = useRecoilValue(campusState);
  const { data: mapRankingData } = useQuery<AxiosResponse<any>, AxiosError>(
    [`${campusId} - mapRankingList`],
    () => axiosInstance.get(MAP_APIS.GET_MAP_RANKING(campusId)),
  );
  return (
    <Container>
      <Title>
        🎉 <span>인기있는 추천지도</span>
      </Title>
      <Description>
        <p>장소가 제일 많이 등록된 추천지도를 소개합니다 👍</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </Description>
      <RankingContainer>
        {mapRankingData?.data?.length !== 0 &&
          mapRankingData?.data?.map((map, id) => (
            <MapCard
              // eslint-disable-next-line react/no-array-index-key
              key={id}
              prop={map}
              isAdmin={false}
            />
          ))}
      </RankingContainer>
      {mapRankingData?.data?.length === 0 && (
        <NoContainer>아직 장소가 있는 추천지도가 없어요 😥</NoContainer>
      )}
    </Container>
  );
}

export default MapRanking;
