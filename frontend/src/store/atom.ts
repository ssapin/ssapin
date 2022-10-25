import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const userInformationState = atom({
  key: "userInfo",
  default: { campus: null, nickName: "", emoji: "" },
});

export const loggedInState = selector({
  key: `loggedIn/${v1()}`,
  get: ({ get }) => {
    const userInfo = get(userInformationState);
    return !!userInfo.nickName;
  },
});
