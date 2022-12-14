import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { lazy } from "react";
import MapCard from "../../components/card/MapCard";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import { campusState } from "../../store/atom";
import { getMapRanking } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";

const SkeletonListComponent = lazy(
  () => import("../../components/etc/SkeletonListComponent"),
);

function MapRanking() {
  const campusId = useRecoilValue(campusState);
  const {
    data: mapRankingData,
    isFetching,
    isSuccess,
  } = useQuery<IMap[], AxiosError>([`${campusId} - mapRankingList`], async () =>
    getMapRanking(Number(campusId)),
  );

  return (
    <MainSectionContainer>
      <MainTitleContainer>
        <>
          π <span>μΈκΈ°μλ μΆμ²μ§λ</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>μ₯μκ° μ μΌ λ§μ΄ λ±λ‘λ μΆμ²μ§λλ₯Ό μκ°ν©λλ€ π</p>
        <p className="textRight">λ§€μΌ μ€μ  08:00 κΈ°μ€</p>
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
          <p>μμ§ μ₯μκ° μλ μΆμ²μ§λκ° μμ΄μ π₯</p>
        </MainNoDataContainer>
      )}
    </MainSectionContainer>
  );
}

export default MapRanking;
