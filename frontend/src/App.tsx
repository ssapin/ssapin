import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilValue } from "recoil";
import Router from "./Router";
import { authState } from "./store/atom";
import { useGetUserInformation } from "./utils/hooks/useUserActions";

function App(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);
  const auth = useRecoilValue(authState);
  const useGetUser = useGetUserInformation();

  useEffect(() => {
    (async () => {
      console.log(auth.accessToken);
      if (auth.accessToken) {
        await useGetUser.getUser();
      }
      setLoading(true);
    })();
  }, []);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        {loading && <Router />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
