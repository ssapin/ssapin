/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { ElementType, memo, useEffect, useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import axiosInstance from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../utils/hooks/useObserver";
import MapCard from "../card/MapCard";

interface InifinteListProps {
  url: string;
  queryKey: string[];
  SkeletonCardComponent: ElementType;
  zeroDataText: string;
  func?: object;
  count: number;
  isEditMode?: boolean;
  isCreated?: boolean;
  change?: (bool: boolean) => void;
}

type GridProps = {
  gridColumnCount: number;
};

const GridContainer = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.gridColumnCount && `repeat(${props.gridColumnCount}, 1fr)`};
  grid-gap: 1rem;
  margin-bottom: 1rem;
`;

function InfiniteList({
  url,
  queryKey,
  SkeletonCardComponent,
  zeroDataText,
  func,
  count,
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
      const res = await axiosInstance.get(`${url}&page=${pageParam}`);
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
        <GridContainer gridColumnCount={count}>
          {targetList?.map((target, idx) => (
            <MapCard
              {...target}
              index={idx}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              func={func}
              isEditMode={isEditMode}
              refetch={refetchData}
              icon={target.mapEmoji}
              title={target.title}
              user={`${target.userEmoji} ${target.nickname}`}
              placecnt={target.placeCnt}
              usercnt={target.userCnt}
            />
          ))}
        </GridContainer>
      )}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer gridColumnCount={count}>
          {Array.from({ length: count }, (_, idx) => idx).map((i) => (
            <SkeletonCardComponent key={i} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteList;

export const MemoInfiniteList = memo(InfiniteList);
