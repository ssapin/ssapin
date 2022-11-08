/* eslint-disable react/require-default-props */
import styled from "@emotion/styled";
import { ElementType, memo, useEffect, useMemo, useRef, useState } from "react";
import { QueryFunctionContext } from "react-query";
import axiosInstance from "../../utils/apis/api";
import { isQueryError } from "../../utils/functions/util";
import useFetchTripsInformation from "../../utils/hooks/useFecthTripsInformation";
import useObserver from "../../utils/hooks/useObserver";

interface InifinteListProps {
  url: string;
  queryKey: string[];
  zeroDataText: string;
  isEditMode?: boolean;
  isCreated?: boolean;
  CardComponent: ElementType;
  change?: (bool: boolean) => void;
}

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
`;

function InfiniteList({
  url,
  queryKey,
  zeroDataText,
  CardComponent,
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

  const noMap = {
    mapId: 0,
    title: "map이 없습니다.",
    userId: 0,
    nickname: "undefined",
    campusId: 0,
    access: 0,
    userEmoji: "undefined",
    mapEmoji: "undefined",
    placeCnt: 0,
    userCnt: 0,
    bookMark: 0,
    placeList: [
      {
        placeId: 0,
        itemId: 0,
        title: "undefined",
        lat: 0,
        lng: 0,
        address: "undefined",
        reviewContent: "undefined",
        userId: 0,
        userEmoji: "undefined",
        nickname: "undefined",
      },
    ],
    hashtagList: [{ hastagId: 0 }],
  };

  return (
    <div>
      {isSuccess && targetList?.length < 1 && (
        <NoContainer>{zeroDataText}</NoContainer>
      )}
      {isError && isQueryError(error) && (
        <NoContainer>{error?.message}</NoContainer>
      )}
      {targetList && (
        <GridContainer>
          {targetList?.map((target, idx) => (
            <CardComponent
              {...target}
              index={idx}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              isEditMode={isEditMode}
              refetch={refetchData}
              prop={target}
              isAdmin={false}
            />
          ))}
        </GridContainer>
      )}
      <div ref={bottom} />
      {isFetchingNextPage && (
        <GridContainer>
          {Array.from({ length: 1 }, (_, idx) => idx).map((i) => (
            <CardComponent key={i} prop={noMap} isAdmin={false} />
          ))}
        </GridContainer>
      )}
    </div>
  );
}

export default InfiniteList;

export const MemoInfiniteList = memo(InfiniteList);
