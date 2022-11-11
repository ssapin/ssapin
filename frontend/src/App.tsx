import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import Loading from "./components/etc/Loading";
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
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>{loading && <Router />}</Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
