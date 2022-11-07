export const MAP_APIS = {
  MAP: "/map",
  BOOKMARK: "/map/bookmark",
  getMap: (mapId: number) => `/map/${mapId}/detail`,
  getMapList: (
    campusId: number,
    page?: number,
    hashtagList?: number[],
    keyword?: string,
  ) => {
    let api: string = `/map?campusId=${campusId}`;
    let str: string = "";
    if (page) {
      api += `&page=${page}`;
    }
    if (keyword && keyword != null && keyword !== "") {
      api += `&keyword=${keyword}`;
    }
    if (hashtagList) {
      const { length } = hashtagList;
      if (length !== 0) {
        hashtagList.forEach((hashtag) => {
          str += hashtag.toString();
          str += ",";
        });
      }
    }
    str = str.substring(0, str.length - 1);
    api += str;
    return api;
  },
  GET_MAP_RANKING: (campusId: number) => `/map/${campusId}/ranking`,
};
