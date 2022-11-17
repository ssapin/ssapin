import React, { useEffect } from "react";
import Loading from "../../components/etc/Loading";
import useUserActions from "../../utils/hooks/useUserActions";

function LoginPage() {
  const useUserAction = useUserActions();

  useEffect(() => {
    useUserAction.login();
  }, []);

  return <Loading />;
}

export default LoginPage;
