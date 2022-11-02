import { IPlace } from "./place.interface";

export interface ITogetherMap {
  togethermapId: number;
  title: string;
  emoji: string;
  question: string;
  campusId: number;
  userCnt: number;
  placeList: IPlace[];
}
