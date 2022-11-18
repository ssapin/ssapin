import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { memo } from "react";
import MapCard from "../../components/card/MapCard";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import { campusState } from "../../store/atom";
import { getMapRanking } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";
import SkeletonListComponent from "../../components/etc/SkeletonListComponent";

function MapRanking() {
  const campusId = useRecoilValue(campusState);
  const {
    data: mapRankingData,
    isFetching,
    isSuccess,
  } = useQuery<IMap[], AxiosError>([`${campusId} - mapRankingList`], async () =>
    getMapRanking(Number(campusId)),
  );

  console.log(isFetching, mapRankingData);

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
        <>
          {isSuccess &&
            mapRankingData?.length !== 0 &&
            mapRankingData?.map((map) => (
              <MapCard key={map.mapId} prop={map} isAdmin={false} />
            ))}
          {isFetching && <SkeletonListComponent number={6} />}
        </>
      </MainCardListContainer>
      {isSuccess && mapRankingData?.length === 0 && (
        <MainNoDataContainer>
          <p>아직 장소가 있는 추천지도가 없어요 😥</p>
        </MainNoDataContainer>
      )}
    </MainSectionContainer>
  );
}

const MemoizedMapRanking = memo(MapRanking);
export default MemoizedMapRanking;
