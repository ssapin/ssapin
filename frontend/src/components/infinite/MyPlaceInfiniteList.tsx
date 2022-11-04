/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import axiosInstance from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../utils/hooks/useObserver";
import MapCard from "../card/MapCard";
import PlaceCard from "../card/PlaceCard";

interface InifinteListProps {
  url: string;
  queryKey: string[];
  zeroDataText: string;
  func?: object;
  isEditMode?: boolean;
  isCreated?: boolean;
  change?: (bool: boolean) => void;
}

const GridContainer = styled.div`
  display: grid;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  grid-gap: 1rem;
  margin-bottom: 1rem;
  justify-items: center;
`;

function InfiniteList({
  url,
  queryKey,
  zeroDataText,
  func,
  isEditMode,
  isCreated,
  change,
}: InifinteListProps) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);
  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      console.log(pageParam);
      const res = await axiosInstance.get(`${url}?page=${pageParam}`);
      return { result: res?.data, page: pageParam };
    } catch {
      setHasError(true);
      return undefined;
    }
  };

  const {
    data,
    error,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchTripsInformation({ queryKey, getTargetComponentList });

  const onIntersect = ([entry]: any) => entry.isIntersecting && fetchNextPage();

  const targetList = useMemo(
    () =>
      data &&
      data.pages?.flatMap(
        (page) => page?.result?.content && page?.result.content,
      ),
    [data],
  );

  const refetchData = () => {
    refetch();
  };

  useObserver({
    target: bottom,
    hasMore: hasNextPage,
    hasError,
    error,
    onIntersect,
  });

  useEffect(() => {
    if (isCreated) refetchData();
    if (change) change(false);
  }, [isCreated]);

  return (
    <div>
      {isSuccess && targetList?.length < 1 && <div>{zeroDataText}</div>}
      {isError && isQueryError(error) && <p>{error?.message}</p>}
      {targetList && (
        <GridContainer>
          {targetList?.map((target, idx) => (
            <PlaceCard
              {...target}
              index={idx}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              func={func}
              isEditMode={isEditMode}
              refetch={refetchData}
              address={target.address}
              place={target.title}
              review={target.content}
              isAdmin={false}
            />
          ))}
        </GridContainer>
      )}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer>
          {Array.from({ length: 1 }, (_, idx) => idx).map((i) => (
            <MapCard
              key={i}
              icon="loading"
              title="loading"
              user="loading"
              placecnt={0}
              usercnt={0}
            />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteList;

export const MemoInfiniteList = memo(InfiniteList);
