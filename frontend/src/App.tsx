import { Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import Loading from "./components/etc/Loading";
import Router from "./Router";
import { authState } from "./store/atom";
import { useGetUserInformation } from "./utils/hooks/useUserActions";

function App(): JSX.Element {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: true,
          },
        },
      }),
  );
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

      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
        kakao.isInitialized();
      }
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>{loading && <Router />}</Suspense>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
