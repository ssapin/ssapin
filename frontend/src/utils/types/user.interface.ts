export interface IUser {
  userId: number;
  nickname: string;
  campusId: number;
  emoji: string;
  mapCnt: number;
  placeCnt: number;
  participateCnt: number;
}

export interface IUserRanking {
  userId: number;
  nickname: string;
  emoji: string;
  mapCount: number;
}
