/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { ElementType, memo, useEffect, useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import { v4 } from "uuid";
import axiosInstance from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../utils/hooks/useObserver";
import spinner from "../../assets/image/spinner.gif";

interface InifinteListProps {
  url: string;
  queryKey: string[];
  CardComponent: ElementType;
  SkeletonCardComponent: ElementType;
  zeroDataText: string;
  func?: object;
  count: number;
  listName: string;
  isEditMode?: boolean;
  isCreated?: boolean;
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
  CardComponent,
  SkeletonCardComponent,
  zeroDataText,
  func,
  count,
  listName,
  isEditMode,
  isCreated,
}: InifinteListProps) {
  const [hasError, setHasError] = useState(false);
  const bottom = useRef(null);

  const getTargetComponentList = async ({
    pageParam = 0,
  }: QueryFunctionContext) => {
    try {
      const res = await axiosInstance.get(`${url}&page=${pageParam}`);
      return { result: res?.data, page: pageParam };
    } catch (_) {
      setHasError(true);
      return undefined;
    }
  };

  const {
    isLoading,
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
      data
        ? data.pages?.flatMap((page) => page?.result && page?.result[listName])
        : [],
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
  }, [isCreated]);
  // FIXME: key change

  return (
    <div>
      {isSuccess && (targetList?.length < 1 || targetList[0] === undefined) && (
        <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
          {zeroDataText}
        </div>
      )}
      {isLoading && (
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img
            src={spinner}
            style={{ width: "auto", height: "20%", textAlign: "center" }}
            alt="로딩 스피너"
          />
        </div>
      )}
      {isError && isQueryError(error) && <p>{error?.message}</p>}
      {isSuccess && !(targetList?.length < 1 || targetList[0] === undefined) && (
        <GridContainer gridColumnCount={count}>
          {targetList?.map((target, idx) => (
            <CardComponent
              {...target}
              index={idx}
              key={v4()}
              func={func}
              isEditMode={isEditMode}
              refetch={refetchData}
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
