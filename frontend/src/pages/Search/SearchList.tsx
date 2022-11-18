import styled from "@emotion/styled";
import { useEffect, useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import { useRecoilState } from "recoil";
import MapCard from "../../components/card/MapCard";
import SkeletonListComponent from "../../components/etc/SkeletonListComponent";
import { campusState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { MAP_APIS } from "../../utils/apis/mapApi";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../utils/hooks/useObserver";

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: center;

  span {
    display: inline;
  }

  ${(props) => props.theme.mq.tablet} {
    padding-left: 0;
  }
`;

const GridContainer = styled.div`
  display: grid;
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
  text-align: center;
`;

type SearchProps = {
  keyword: string;
  hashtag: number[];
};

function SearchList({ keyword, hashtag }: SearchProps) {
  const [campusId] = useRecoilState(campusState);
  const [hasError, setHasError] = useState(false);
  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      const res = await axiosInstance.get(
        `${MAP_APIS.SEARCH_MAP_LIST(campusId, pageParam, hashtag, keyword)}`,
      );
      return { result: res?.data, page: pageParam };
    } catch {
      setHasError(true);
      return undefined;
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isLoading,
  } = useFetchTripsInformation({
    queryKey: ["mapList"],
    getTargetComponentList,
  });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();
  const bottom = useRef(null);

  const targetList = useMemo(
    () =>
      data &&
      data.pages?.flatMap(
        (page) => page?.result?.content?.length && page?.result.content,
      ),
    [data],
  );

  useObserver({
    target: bottom,
    hasMore: hasNextPage,
    hasError,
    error,
    onIntersect,
  });

  useEffect(() => {
    refetch();
  }, [campusId]);

  useEffect(() => {
    refetch();
  }, [hashtag]);

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <Container>
      <Title>
        <span>🗺 추천지도 🗺</span>
      </Title>
      {targetList?.length && targetList[0] === 0 && (
        <NoContainer>
          휘이잉~... a(•́ ̯•̀)a 아직 추천지도가 없어요 😥
          <br />
          <br />
          지도를 만들어보시는건 어때요?
        </NoContainer>
      )}
      <GridContainer>
        {isLoading && <SkeletonListComponent number={15} />}

        {targetList && targetList[0] !== 0 && (
          <>
            {targetList?.length &&
              targetList?.map((target, idx) => (
                <MapCard
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...target}
                  index={idx}
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  prop={target}
                  isAdmin={false}
                />
              ))}
            {isFetching && <SkeletonListComponent number={15} />}
          </>
        )}
      </GridContainer>

      <div ref={bottom} />
    </Container>
  );
}
export default SearchList;
