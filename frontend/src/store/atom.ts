import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { cookie } from "../utils/functions/cookie";

interface UserInformation {
  campusId: number;
  nickName: string;
  emoji: string;
  userId: number;
}

interface Auth {
  accessToken: string;
}

export const authState = atom<Auth>({
  key: `auth/${v1()}`,
  default: { accessToken: cookie.get("accessToken") },
});

export const userInformationState = atom<UserInformation>({
  key: "userInformation",
  default: { campusId: null, nickName: "", emoji: "", userId: null },
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
