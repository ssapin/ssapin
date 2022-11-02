import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const authState = atom({
  key: "userInfo",
  default: { campus: null, nickName: "", emoji: "", accessToken: "" },
});

export const loggedInState = selector({
  key: `loggedIn/${v1()}`,
  get: ({ get }) => {
    const userInfo = get(authState);
    return !!userInfo.nickName;
  },
});

export const campusState = atom({
  key: "campusRecoilState",
  default: 1,
});
