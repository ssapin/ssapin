export interface IPlace {
  placeId: number;
  itemId: number;
  title: string;
  lat: number;
  lng: number;
  address: string;
  reviewContent: string;
  userId: number;
  userEmoji: string;
  nickname: string;
}

export interface RankingPlace {
  placeId: number;
  itemId: number;
  title: string;
  lat: number;
  address: string;
}

export interface IPlaceRanking {
  review: RankingPlace;
  bookmark: RankingPlace;
  pin: RankingPlace;
}
