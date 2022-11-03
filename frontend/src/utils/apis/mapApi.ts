export const mapApis = {
  map: "/map",
  bookmark: "/map/bookmark",
  getMap: (mapId: number) => `/map/${mapId}/detail`,
  getMapList: (
    campusId: number,
    page: number,
    hashtagList: number[],
    keyword: string,
  ) => {
    let api: string = `/map?campusId=${campusId}&page=${page}`;
    let str: string = "";
    if (keyword != null && keyword !== "") {
      api += `&keyword=${keyword}`;
    }
    const { length } = hashtagList;
    if (length !== 0) {
      hashtagList.forEach(function (hashtag) {
        str += hashtag.toString();
        str += ",";
      });
    }
    str = str.substring(0, str.length - 1);
    api += str;
    return api;
  },
  getMapRanking: (campusId: number) => `/map/${campusId}/ranking`,
};
