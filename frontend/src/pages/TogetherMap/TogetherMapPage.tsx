import styled from "@emotion/styled";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "../../components/Buttons/BackButton";
import CreateButton from "../../components/Buttons/CreateButton";
import TogetherMapTitleCard from "../../components/card/TogetherMapTitleCard";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { authState, campusState } from "../../store/atom";
import { getTogetherMap } from "../../utils/apis/togethermapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import LoginModal from "../Login/LoginModal";
import building from "../../assets/svgs/building.svg";

import "./style.css";
import { IKakaoPlace, IPlace } from "../../utils/types/place.interface";
import PlaceDetailModal from "./PlaceDetailModal";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Container = styled.section`
  position: relative;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

const ButtonContainer = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 25px;
  right: 25px;
`;

const BackContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 10px;
  left: 10px;
`;

type Coordinate = [number, number];

function TogetherMap() {
  const mapRef = useRef<HTMLDivElement>();
  const [mapObj, setMapObj] = useState({ map: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [placeId, setPlaceId] = useState();
  const { togethermapId } = useParams();
  const navigate = useNavigate();

  const userCampusId = useRecoilValue(campusState);

  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    () => getTogetherMap(Number(togethermapId)),
  );
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const auth = useRecoilValue(authState);

  const addMarker = (position: number, idx: number, map: any) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
    const imageSize = new kakao.maps.Size(50, 50);
    const imgOptions = {
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(20, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new kakao.maps.Marker({
      position,
      // image: markerImage,
    });
    marker.setMap(map);
    return marker;
  };

  const openModal = (id) => {
    setModalOpen(true);
    setPlaceId(id);
  };

  const placePlaceListMarker = (placeList: IPlace[]) => {
    // eslint-disable-next-line no-restricted-syntax
    for (let i = 0; i < placeList.length; i++) {
      console.log(placeList);
      const pos = new kakao.maps.LatLng(placeList[i].lng, placeList[i].lat);
      addMarker(pos, i, mapObj.map);
      const content = makePin(placeList[i]);
      const customOverlay = new kakao.maps.CustomOverlay({
        map: mapObj?.map,
        position: pos,
        content,
        yAnchor: 2,
      });
    }
  };

  // <img src=${avatar} width='30' alt="avatar image" />
  const makePin = (place: IPlace, avatar: SVGAElement | string) => {
    const container = document.createElement("div");
    container.setAttribute("class", "marker_overlay shadow");
    container.innerHTML = `
              <div class="place_name text_primary">${place.title}</div>
              <div class="avatar">
                <div>${place.userEmoji}</div>
                
              </div>
    `;
    container.onclick = () => {
      openModal(place.title);
    };
    return container;
  };

  useEffect(() => {
    const campusLocation = togetherMapData
      ? CAMPUS_LIST[Number(togetherMapData.campusId)]
      : CAMPUS_LIST[userCampusId];
    const [lat, lan]: Coordinate = [
      +CAMPUS_COORDINATE_LIST[campusLocation].y,
      +CAMPUS_COORDINATE_LIST[campusLocation].x,
    ];

    const mapContainer = mapRef.current;
    const position = new kakao.maps.LatLng(lat, lan);
    const options = {
      center: position,
      level: 3,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const campusName = CAMPUS_COORDINATE_LIST[campusLocation];
    const map = new kakao.maps.Map(mapContainer, options);
    const marker = addMarker(position, 0, map);
    const img = "https://www.ssafy.com/swp_m/images/common/logo3.png";
    const content = makePin(campusName, img);
    const customOverlay = new kakao.maps.CustomOverlay({
      map,
      position,
      content,
      yAnchor: 2,
    });
    setMapObj({ map });

    console.log(togetherMapData);
  }, []);

  const addNewPlace = () => {
    if (auth.accessToken) navigate(`/togethermaps/${togethermapId}/new`);
    else setLoginModalOpen(true);
  };

  return (
    <Container>
      <MapContainer ref={mapRef} />
      <BackContainer>
        <BackButton />
        <TogetherMapTitleCard title={togetherMapData?.title} />
      </BackContainer>
      <ButtonContainer>
        <CreateButton text="장소 추가하기" type="button" func={addNewPlace} />
      </ButtonContainer>
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
      {modalOpen && (
        <ModalPortal>
          <PlaceDetailModal
            placeId={placeId}
            onClose={() => setModalOpen(false)}
          />
        </ModalPortal>
      )}
    </Container>
  );
}

export default TogetherMap;
