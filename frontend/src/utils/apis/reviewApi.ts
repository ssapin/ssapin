import { I } from "msw/lib/glossary-dc3fd077";
import axiosInstance from "./api";

const REVIEW_API = {
  REVIEW: `review/login`,
};

export interface IReviewPlace {
  placeId: number;
  emojiType: number;
  content: string;
}

export function registerReview(data: IReviewPlace) {
  axiosInstance.post(REVIEW_API.REVIEW, data);
}
const REVIEW_APIS = {
  getReviewList: (placeId: number) => `/review/${placeId}`,
  REVIEW: `/review/login`,
};

export default REVIEW_APIS;
