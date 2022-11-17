import axiosInstance from "./api";

const REVIEW_APIS = {
  getReviewList: (placeId: number) => `/review/${placeId}`,
  REVIEW: `/review/login`,
};
export interface IReviewPlace {
  placeId: number;
  emojiType: number;
  content: string;
}

export const registerReview = async (data: IReviewPlace) => {
  try {
    const response = await axiosInstance.post(REVIEW_APIS.REVIEW, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default REVIEW_APIS;
