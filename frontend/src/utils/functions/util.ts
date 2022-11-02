import { Cookies } from "react-cookie";

export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const pixelToRem = (size: number) => `${size / 16}rem`;

const cookies = new Cookies();

export const cookie = {
  set: (name: string, value: string, option?: any) => {
    return cookies.set(name, value, { ...option });
  },
  get: (name: string, option?: any) => {
    return cookies.get(name, { ...option });
  },
  remove: (name: string, option?: any) => {
    cookies.remove(name, { ...option });
  },
};
