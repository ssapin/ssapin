import axiosInstance from "./api";

const REVIEW_API = {
  REVIEW: `review/login`,
};

export interface IReviewPlace {
  placeId: number;
  emojiType: number;
  content: string;
}

export const registerReview = async (data: IReviewPlace) => {
  try {
    const response = await axiosInstance.post(REVIEW_API.REVIEW, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
const REVIEW_APIS = {
  getReviewList: (placeId: number) => `/review/${placeId}`,
  REVIEW: `/review/login`,
};

export default REVIEW_APIS;
