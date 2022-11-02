import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { userInformationState } from "../../store/atom";
import { removeCookie } from "../functions/cookie";

function useLogout() {
  const navigate = useNavigate();
  return () => {
    useResetRecoilState(userInformationState);
    removeCookie("accessToken");
    navigate("/");
  };
}

export default useLogout;
