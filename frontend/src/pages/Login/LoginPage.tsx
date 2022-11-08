import React, { useEffect } from "react";
import useUserActions from "../../utils/hooks/useUserActions";

function LoginPage() {
  const useUserAction = useUserActions();

  useEffect(() => {
    useUserAction.login();
  }, []);

  return <div>Login</div>;
}

export default LoginPage;
