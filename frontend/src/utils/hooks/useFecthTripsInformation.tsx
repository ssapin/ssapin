import { QueryFunctionContext, useInfiniteQuery } from "react-query";

interface UseFetchTripsInformationProps {
  queryKey: string[];
  getTargetComponentList(number: QueryFunctionContext): Promise<
    | {
        result: any;
        page: any;
      }
    | undefined
  >;
}

const useFetchTripsInformation = ({
  queryKey,
  getTargetComponentList,
}: UseFetchTripsInformationProps) =>
  useInfiniteQuery(queryKey, getTargetComponentList, {
    // eslint-disable-next-line consistent-return
    getNextPageParam: (lastPage: any) => {
      if (!lastPage?.result?.last) {
        if (!lastPage?.result?.last) return lastPage.page + 1;
        // return false;
      }
      // return false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

export default useFetchTripsInformation;
