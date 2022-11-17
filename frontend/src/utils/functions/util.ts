import { HASHTAG_LIST } from "../constants/contant";
import { IHashtag } from "../types/hashtag.interface";

export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const pixelToRem = (size: number) => `${size / 16}rem`;

export const makeHashListToSting = (hashList: IHashtag[]) => {
  console.log(hashList);
  const hashs = hashList.reduce(
    (acc, cur) => `${acc} #${HASHTAG_LIST[cur.hashtagId]} `,
    "",
  );
  return hashs;
};
