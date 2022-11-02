import { atom } from "recoil";
import { v1 } from "uuid";

export const loggedInState = atom({
  key: `loggedIn/${v1()}`,
  default: !!"accessToken",
});

export const campusState = atom({
  key: "campusRecoilState",
  default: 1,
});
