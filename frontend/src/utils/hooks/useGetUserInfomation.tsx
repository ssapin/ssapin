import React from "react";
import { useSetRecoilState } from "recoil";
import { userInformationState } from "../../store/atom";

function useGetUserInfomation() {
  const [userInformation, setuserInformation] =
    useSetRecoilState(userInformationState);
  return <div />;
}

export default useGetUserInfomation;
