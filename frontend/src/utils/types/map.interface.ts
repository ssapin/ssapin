import { IHashtag } from "./hashtag.interface";
import { IPlace } from "./place.interface";

export interface IMap {
  mapId: number;
  title: string;
  userId: number;
  nickname: string;
  campusId: number;
  access: boolean;
  userEmoji: string;
  mapEmoji: string;
  placeCnt: number;
  bookmarkCnt: number;
  bookMark: boolean;
  placeList: IPlace[];
  hashtagList: IHashtag[];
}
