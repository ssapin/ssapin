import { atom } from "recoil";
import { v1 } from "uuid";

export const loggedInState = atom({
  key: `loggedIn/${v1()}`,
  default: !!"accessToken",
});

export const userInformationState = atom({
  key: "userInfo",
  default: { campus: null, nickName: "", emoji: "" },
});
