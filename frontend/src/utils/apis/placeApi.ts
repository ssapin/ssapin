const PLACE_APIS = {
  getPlaceRanking: (campusId: number) => `/place/ranking/${campusId}`,
  getDetailPlaceInfo: (placeId: number) => `/place/${placeId}/detail`,
  getMapListInPlace: (placeId: number) => `/place/map/${placeId}`,
  MAP: `/place/login/map`,
  TOGETHERMAP: `/place/login/togethermap`,
  BOOKMARK: `/place/login/bookmark`,
};

export default PLACE_APIS;
