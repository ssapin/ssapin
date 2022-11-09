import axiosInstance from "../apis/api";
import PLACE_APIS from "../apis/placeApi";
import {
  IAddPlace,
  IKakaoPlace,
  IPlaceBookmark,
  IPlaceMin,
  IRemovePlaceMap,
  IRemovePlaceTogethermap,
} from "../types/place.interface";

export function getKakaoPlace(place: IKakaoPlace): IPlaceMin {
  const result: IPlaceMin = {
    itemId: Number(place.id),
    title: place.place_name,
    lat: Number(place.y),
    lng: Number(place.x),
    address: place.address_name,
  };

  return result;
}

export function getRequestPlace(data: IPlaceMin, id: number): IAddPlace {
  const result: IAddPlace = {
    mapId: Number(id),
    place: data,
  };

  return result;
}

// 추천지도 장소추가
export function addPlaceToMap(data: IAddPlace) {
  axiosInstance.post(PLACE_APIS.MAP, data);
}

// 모여지도 장소추가/업데이트
export function addPlaceToTogetherMap(data: IAddPlace) {
  axiosInstance.post(PLACE_APIS.MAP, data);
}

// 추천지도 장소 삭제
export function removePlaceInMap(d_data: IRemovePlaceMap) {
  axiosInstance.delete(PLACE_APIS.MAP, {
    data: {
      placeId: d_data.placeId,
      mapId: d_data.mapId,
    },
  });
}

// 모여지도 장소 삭제
export function removePlaceInTogethermap(d_data: IRemovePlaceTogethermap) {
  axiosInstance.delete(PLACE_APIS.TOGETHERMAP, {
    data: {
      placeId: d_data.placeId,
      togethermapId: d_data.togethermapId,
    },
  });
}

// 장소 정보 조회
export function getDetailPlaceInfo(itemId: String) {
  const id: number = Number(itemId);

  axiosInstance.get(PLACE_APIS.getDetailPlaceInfo(id));
}

// 장소가 추가된 추천지도 리스트 조회
export function getMapListInPlace(itemId: String) {
  const id: number = Number(itemId);

  axiosInstance.get(PLACE_APIS.getMapListInPlace(id));
}

// 장소 북마크 등록
export function addBookmarkInPlace(data: IPlaceBookmark) {
  axiosInstance.post(PLACE_APIS.BOOKMARK, data);
}

// 장소 북마크 해제
export function removeBookmarkInPlace(d_data: IPlaceBookmark) {
  axiosInstance.delete(PLACE_APIS.BOOKMARK, {
    data: { itemId: d_data.itemId },
  });
}

export const addPlace = (kakakoplace: IKakaoPlace, id: number) => () => {
  console.log("실행");

  const place: IPlaceMin = getKakaoPlace(kakakoplace);
  const data: IAddPlace = getRequestPlace(place, id);
  addPlaceToMap(data);
};
