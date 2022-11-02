export const togethermapApis = {
  getTogetherMapList: (campusId: number) => `/togethermap/${campusId}`,
  getTogetherMap: (togethermapId: number) =>
    `/togethermap/${togethermapId}/detail`,
};
