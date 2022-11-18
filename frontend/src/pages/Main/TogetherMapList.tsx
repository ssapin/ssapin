import TogetherMapCard from "../../components/card/TogetherMapCard";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainNoDataContainer from "../../components/containers/MainNoDataContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import IntersectSectionContainer from "../../components/containers/IntersectSectionContainer";

interface TogetherMapListProps {
  togetherData: ITogetherMap[];
}
function TogetherMapList({ togetherData }: TogetherMapListProps) {
  return (
    <IntersectSectionContainer>
      <MainTitleContainer>
        <>
          🎪 <span>모여지도</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>테마별 자신의 베스트 1위! 장소를 등록해보세요 🥳</p>
      </MainDescriptionContainer>
      <MainCardListContainer>
        {togetherData?.length !== 0 &&
          togetherData?.map((map) => (
            <TogetherMapCard key={map.togethermapId} prop={map} />
          ))}
      </MainCardListContainer>
      {togetherData?.length === 0 && (
        <MainNoDataContainer>
          <p>아직 장소가 있는 모여지도가 없어요 😥</p>
        </MainNoDataContainer>
      )}
    </IntersectSectionContainer>
  );
}

export default TogetherMapList;
