import React, { Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import Router from "./Router";
import { authState } from "./store/atom";
import { useGetUserInformation } from "./utils/hooks/useUserActions";

function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);
  const auth = useRecoilValue(authState);
  const useGetUser = useGetUserInformation();

  useEffect(() => {
    (async () => {
      if (auth.accessToken) {
        await useGetUser.getUser();
      }
      setLoading(true);
    })();
    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
        Kakao.isInitialized();
      }
    }
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <Suspense fallback={<div>로딩중 ...</div>}>
            {loading && <Router />}
          </Suspense>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
