import { AxiosError } from "axios";
import { lazy } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import HotPlaceCard from "../../components/card/HotPlaceCard";
import MainCardListContainer from "../../components/containers/MainCardListContainer";
import MainDescriptionContainer from "../../components/containers/MainDescriptionContainer";
import MainSectionContainer from "../../components/containers/MainSectionContainer";
import MainTitleContainer from "../../components/containers/MainTitleContainer";
import { campusState } from "../../store/atom";
import { getPlaceRanking } from "../../utils/apis/placeApi";
import { IPlaceRanking } from "../../utils/types/place.interface";

const SkeletonListComponent = lazy(
  () => import("../../components/etc/SkeletonListComponent"),
);

function PlaceRanking() {
  const campusId = useRecoilValue(campusState);

  const {
    data: places,
    isLoading,
    isSuccess,
  } = useQuery<IPlaceRanking, AxiosError>(
    [`${campusId} - placeRankingList`],
    () => getPlaceRanking(Number(campusId)),
  );

  return (
    <MainSectionContainer tag="section">
      <MainTitleContainer>
        <>
          π <span>μΊ νΌμ€ κ·Όμ² ν«νλ μ΄μ€</span>
        </>
      </MainTitleContainer>
      <MainDescriptionContainer>
        <p>μΈνλ¬λ€μκ² κ°μ₯ ν«ν μ₯μλ€μ λ¦¬λ·°/ν/μ° μμΌλ‘ λ³΄μ¬λλ €μ π</p>
      </MainDescriptionContainer>
      <MainCardListContainer column={30} mobileColumn={80}>
        {isLoading && <SkeletonListComponent number={3} />}
        {isSuccess && (
          <>
            <HotPlaceCard
              place={
                places !== undefined && places.review !== null
                  ? places.review
                  : undefined
              }
              message="π₯ λ¦¬λ·°κ° λΆνκ³  μμ΄μ"
            />
            <HotPlaceCard
              place={
                places !== undefined && places.pin !== null
                  ? places.pin
                  : undefined
              }
              message="π κ°μ₯ λ§μ μ§λμ μ°ν μ₯μ"
            />
            <HotPlaceCard
              place={
                places !== undefined && places.bookmark !== null
                  ? places.bookmark
                  : undefined
              }
              message="π μΈνλ¬λ€μ΄ νΉμμ§± μ°ν μ₯μ"
            />
          </>
        )}
      </MainCardListContainer>
    </MainSectionContainer>
  );
}

export default PlaceRanking;
