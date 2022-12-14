import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { lazy } from "react";
import ShowMoreButton from "../../components/Buttons/ShowMoreButton";
import MapCard from "../../components/card/MapCard";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import { campusState } from "../../store/atom";
import { getMainMapList } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";

const SkeletonListComponent = lazy(
  () => import("../../components/etc/SkeletonListComponent"),
);

function MapList() {
  const campusId = useRecoilValue(campusState);
  const { data: mapData, isFetching } = useQuery<IMap[], AxiosError>(
    [`${campusId} - mapList`],
    () => getMainMapList(Number(campusId)),
  );
  return (
    <MainSectionContainer>
      <MainTitleContainer>
        <>
          πΊ <span>μΆμ²μ§λ</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>
          μΈνλ¬λ€μκ² μλ¦¬κ³  μΆμ μ₯μλ₯Ό λλ§μ μΆμ²μ§λμ λ§κ΅¬λ§κ΅¬
          λ±λ‘ν΄λ³΄μΈμ π€©
        </p>
      </MainDescriptionContainer>
      <MainCardListContainer>
        <>
          {mapData?.length !== 0 &&
            mapData?.map((map) => (
              <MapCard key={map.mapId} prop={map} isAdmin={false} />
            ))}
          {isFetching && <SkeletonListComponent number={6} />}
        </>
      </MainCardListContainer>
      {mapData?.length === 0 && (
        <MainNoDataContainer>
          <p>μμ§ μΆμ²μ§λκ° μμ΄μ π₯</p>
        </MainNoDataContainer>
      )}
      <ShowMoreButton />
    </MainSectionContainer>
  );
}

export default MapList;
