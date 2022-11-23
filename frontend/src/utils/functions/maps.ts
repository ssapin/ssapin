import { IPlace } from "../types/place.interface";

interface ICenter {
  title: string;
  placeId: number;
}

export const makePin = (
  place: IPlace | ICenter,
  avatar?: string,
  func?: (key: number) => void,
) => {
  const container = document.createElement("div");
  container.setAttribute("class", "marker_overlay shadow");
  const placeName = document.createElement("div");
  placeName.setAttribute("class", "place_name text_primary");
  placeName.append(place.title);
  const emoji = document.createElement("div");
  emoji.setAttribute("class", "avatar");
  emoji.append(avatar);
  container.append(placeName, emoji);
  if (place.placeId) {
    container.onclick = () => {
      func(place.placeId);
    };
  }

  return container;
};

export const makeCampusPin = (place: IPlace | ICenter, img: string) => {
  const container = document.createElement("div");
  container.setAttribute("class", "campus_pin_overlay shadow");
  const placeName = document.createElement("div");
  placeName.setAttribute("class", "place_name");
  placeName.append(place.title);
  const emoji = document.createElement("img");
  emoji.src = img;
  emoji.width = 30;
  emoji.height = 30;
  emoji.alt = "ssafy logo";
  emoji.setAttribute("class", "map_logo");
  container.append(placeName, emoji);

  return container;
};
