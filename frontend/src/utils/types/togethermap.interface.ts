import { IPlace } from "./place.interface";

export interface ITogetherMap {
  togethermapId: number;
  title: string;
  campusId: number;
  userCnt: number;
  placeList: IPlace[];
}
