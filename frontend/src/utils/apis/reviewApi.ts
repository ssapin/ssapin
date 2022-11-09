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

export default REVIEW_API;
