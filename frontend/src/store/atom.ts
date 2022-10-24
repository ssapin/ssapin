import { atom } from "recoil";
import { v1 } from "uuid";

export const loggedInState = atom({
  key: `loggedIn/${v1()}`,
  default: !!"accessToken",
});
