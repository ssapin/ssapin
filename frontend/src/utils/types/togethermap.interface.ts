import { IKakaoPlace, IPlace } from "./place.interface";

export interface ITogetherMap {
  togethermapId: number;
  title: string;
  emoji: string;
  question: string;
  campusId: number;
  userCnt: number;
  placeList?: IPlace[];
}

export interface CampusCoordinate {
  [key: string]: IKakaoPlace;
}
