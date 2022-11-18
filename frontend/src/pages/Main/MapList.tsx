import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
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
import SkeletonListComponent from "../../components/etc/SkeletonListComponent";

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
          🗺 <span>추천지도</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>
          싸핀러들에게 알리고 싶은 장소를 나만의 추천지도에 마구마구
          등록해보세요 🤩
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
          <p>아직 추천지도가 없어요 😥</p>
        </MainNoDataContainer>
      )}
      <ShowMoreButton />
    </MainSectionContainer>
  );
}

export default MapList;
