import { rest } from "msw";

const togethermapList = {
  togethermapId: 1,
  title: "공부하기 좋은 장소",
  campusId: 1,
  userCnt: 3,
  placeList: [
    {
      placeId: long,
      itemId: long,
      title: string,
      lat: float,
      lng: float,
      address: string,
      reviewContent: string,
      userId: long,
      userEmoji: string,
      nickname: string,
    },
  ],
};

export const handlers = [
  rest.get("/togethermaps/1/detail", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
