export const mapApis = {
  map: "/map/login",
  bookmark: "/map/login/bookmark",
  getMap: (mapId: number) => `/map/${mapId}/detail`,
  getMapList: (
    campusId: number,
    page?: number,
    hashtagList?: number[],
    keyword?: string,
  ) => {
    console.log(campusId);
    console.log(page);
    console.log(hashtagList);
    console.log(keyword);
    let api: string = `/map?campusId=${campusId}`;
    if (page) {
      api += `&page=${page}`;
    }
    if (keyword && keyword != null && keyword !== "") {
      api += `&keyword=${keyword}`;
    }
    let str: string = "&hashtagList=";
    if (hashtagList) {
      const { length } = hashtagList;
      if (length !== 0) {
        hashtagList.forEach(function (hashtag) {
          str += hashtag.toString();
          str += ",";
        });
      }
    }
    str = str.substring(0, str.length - 1);
    api += str;
    return api;
  },
  getMapRanking: (campusId: number) => `/map/${campusId}/ranking`,
};
