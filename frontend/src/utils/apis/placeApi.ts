const PLACE_APIS = {
  getPlaceRanking: (campusId: number) => `/place/ranking/${campusId}`,
  getDetailPlaceInfo: (itemId: number) => `/place/${itemId}/detail/`,
  getMapListInPlace: (itemId: number) => `/place/map/${itemId}`,
  MAP: `place/login/map`,
  TOGETHERMAP: `place/login/togethermap`,
  BOOKMARK: `place/login/bookmark`,
};

export default PLACE_APIS;
