const PLACE_APIS = {
  getPlaceRanking: (campusId: number) => `/place/ranking/${campusId}`,
  getDetailPlaceInfo: (itemId: number) => `/place/${itemId}/detail/`,
  getMapListInMap: (itemId: number) => `/place/map/${itemId}`,
  PLACE_MAP: `place/login/map`,
  PLACE_TOGETHERMAP: `place/login/togethermap`,
  BOOKMARK: `place/login/bookmark`,
};

export default PLACE_APIS;
