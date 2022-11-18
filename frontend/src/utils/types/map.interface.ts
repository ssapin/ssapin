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

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort2 {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IMapObject {
  content: IMap[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort2;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
