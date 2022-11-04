import styled from "@emotion/styled";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { KakaoPlaceObj } from "../../utils/types/common";

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const { kakao } = window;

function NewPlace() {
  const mapRefs = useRef<HTMLDivElement>();
  const [keyword, setKeyword] = useState("");
  const [mapObj, setMapObj] = useState({
    map: null,
    ps: null,
    infowindow: null,
  });
  const [placeList, setPlaceList] = useState<KakaoPlaceObj[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const displayMarker = (place: KakaoPlaceObj) => {
    const marker = new kakao.maps.Marker({
      map: mapObj.map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    kakao.maps.event.addListener(marker, "click", () => {
      mapObj.infowindow?.setContent(
        `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`,
      );
      mapObj.infowindow?.open(mapObj.map, marker);
    });
  };

  const placesSearchCB = (data: KakaoPlaceObj[], status: string) => {
    console.log(data, status);
    if (status === kakao.maps.services.Status.OK) {
      const bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i + 1) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }

      mapObj.map?.setBounds(bounds);
    }
  };

  const searchKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    mapObj.ps?.keywordSearch(keyword, placesSearchCB);
    setKeyword("");
  };

  useEffect(() => {
    const container = mapRefs.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setMapObj({ map, ps, infowindow });
  }, []);

  return (
    <>
      <div>
        <form
          onSubmit={searchKeyword}
          style={{ zIndex: 100, position: "fixed" }}
        >
          <input
            placeholder="Search Place..."
            onChange={onChange}
            value={keyword}
          />
          <button type="submit">검색</button>
        </form>
        {/* <ul>
          {placeList?.map((place) => (
            <li>{place.place_name}</li>
          ))}
        </ul> */}
      </div>
      <MapContainer ref={mapRefs} />
    </>
  );
}

export default NewPlace;
