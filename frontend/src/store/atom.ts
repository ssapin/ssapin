import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { cookie } from "../utils/functions/cookie";
import { IUser } from "../utils/types/user.interface";

interface Auth {
  accessToken: string;
  firstLogin: false;
}

export const authState = atom<Auth>({
  key: `auth/${v1()}`,
  default: { accessToken: cookie.get("accessToken"), firstLogin: false },
});

export const userInformationState = atom<IUser>({
  key: "userInformation",
  default: {
    campusId: null,
    nickname: "",
    emoji: "",
    userId: null,
    mapCnt: 0,
    placeCnt: 0,
    participateCnt: 0,
  },
});

export const loggedInState = selector({
  key: `loggedIn/${v1()}`,
  get: ({ get }) => {
    const userInfo = get(authState);
    return !!userInfo.accessToken;
  },
});

export const campusState = atom({
  key: "campusRecoilState",
  default: 1,
});
