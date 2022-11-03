import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const cookie = {
  set: (name: string, value: string, option?: any) => {
    return cookies.set(name, value, { ...option });
  },
  get: (name: string, option?: any) => {
    return cookies.get(name, { ...option });
  },
  remove: (name: string, option?: any) => {
    return cookies.remove(name, { ...option });
  },
};
