import { rest } from "msw";

export const handlers = [
  rest.get("/togethermaps/1/detail", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
