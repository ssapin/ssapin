import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import MapCard from "../../components/card/MapCard";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import { campusState } from "../../store/atom";
import { getMapRanking } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";

function MapRanking() {
  const campusId = useRecoilValue(campusState);
  const { data: mapRankingData } = useQuery<IMap[], AxiosError>(
    [`${campusId} - mapRankingList`],
    async () => getMapRanking(Number(campusId)),
  );

  return (
    <MainSectionContainer>
      <MainTitleContainer>
        <>
          🎉 <span>인기있는 추천지도</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>장소가 제일 많이 등록된 추천지도를 소개합니다 👍</p>
        <p className="textRight">매일 오전 08:00 기준</p>
      </MainDescriptionContainer>
      <MainCardListContainer>
        {mapRankingData?.length !== 0 &&
          mapRankingData?.map((map) => (
            <MapCard key={map.mapId} prop={map} isAdmin={false} />
          ))}
      </MainCardListContainer>
      {mapRankingData?.length === 0 && (
        <MainNoDataContainer>
          <p>아직 장소가 있는 추천지도가 없어요 😥</p>
        </MainNoDataContainer>
      )}
    </MainSectionContainer>
  );
}

export default MapRanking;
