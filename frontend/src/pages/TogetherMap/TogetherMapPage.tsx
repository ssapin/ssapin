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

import "./style.css";
import { IPlace } from "../../utils/types/place.interface";
import PlaceDetailModal from "./PlaceDetailModal";
import PlaceCard from "../../components/card/PlaceCard";
import { getCurrentLocation } from "../../utils/functions/getCurrentLocation";
import MenuButton from "../../components/Buttons/MenuButton";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Container = styled.section`
  position: relative;
  overflow: hidden;
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

const SubjectContainer = styled(BackContainer)`
  left: 50%;
  margin-left: -11rem;
`;

const PlaceListContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 30px;
  z-index: 2;
  > ul {
    right: 10px;
  }
`;

const NavContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 10px;
  right: 10px;
`;

type Coordinate = [number, number];

function TogetherMap() {
  const mapRef = useRef<HTMLDivElement>();
  const [mapObj, setMapObj] = useState({ map: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [placeId, setPlaceId] = useState<number>();
  const { togethermapId } = useParams();
  const navigate = useNavigate();
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const auth = useRecoilValue(authState);
  const userCampusId = useRecoilValue(campusState);

  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    async () => getTogetherMap(Number(togethermapId)),
  );

  const addMarker = (position: any, idx: number, map: any) => {
    // const imageSrc =
    //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png";
    // const imageSize = new kakao.maps.Size(50, 50);
    // const imgOptions = {
    //   spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
    //   offset: new kakao.maps.Point(20, 37),
    // };
    // const markerImage = new kakao.maps.MarkerImage(
    //   imageSrc,
    //   imageSize,
    //   imgOptions,
    // );
    const marker = new kakao.maps.Marker({
      position,
      // image: markerImage,
    });
    marker.setMap(map);
    return marker;
  };

  const openModal = (id: number) => {
    setModalOpen(true);
    setPlaceId(id);
  };

  const makePin = (place: IPlace, avatar: string) => {
    const container = document.createElement("div");
    container.setAttribute("class", "marker_overlay shadow");
    const placeName = document.createElement("div");
    placeName.setAttribute("class", "place_name text_primary");
    placeName.append(place.title);
    const emoji = document.createElement("div");
    emoji.setAttribute("class", "avatar");
    emoji.append(avatar);
    container.append(placeName, emoji);
    container.onclick = () => {
      openModal(place.placeId);
    };
    return container;
  };

  useEffect(() => {
    (async () =>
      kakao.maps.load(async () => {
        console.log(togetherMapData);
        const campusLocation = togetherMapData
          ? CAMPUS_LIST[Number(togetherMapData.campusId)]
          : CAMPUS_LIST[userCampusId];
        const [lat, lan]: Coordinate = [
          +CAMPUS_COORDINATE_LIST[campusLocation].y,
          +CAMPUS_COORDINATE_LIST[campusLocation].x,
        ];

        const mapContainer = mapRef.current;
        const position = await new kakao.maps.LatLng(lat, lan);
        const options = {
          center: position,
          level: 3,
        };

        // const campusName = CAMPUS_COORDINATE_LIST[campusLocation];
        const map = await new kakao.maps.Map(mapContainer, options);
        addMarker(position, 0, map);
        // const img = "";
        // const content = makePin(campusName, img);
        // const customOverlay = new kakao.maps.CustomOverlay({
        //   map,
        //   position,
        //   content,
        //   yAnchor: 2,
        // });
        setMapObj({ map });
      }))();
  }, []);

  useEffect(() => {
    if (!togetherMapData) return;
    if (!mapObj.map) return;
    if (!togetherMapData?.placeList || togetherMapData.placeList.length < 1)
      return;
    (async () => {
      console.log(togetherMapData);
      const bounds = await new kakao.maps.LatLngBounds();
      togetherMapData.placeList.forEach(async (place) => {
        const placePosition = new kakao.maps.LatLng(place.lat, place.lng);
        bounds.extend(placePosition);
        addMarker(placePosition, 0, mapObj.map);
        const cont = makePin(place, place.userEmoji);
        const _ = await new kakao.maps.CustomOverlay({
          map: mapObj.map,
          position: placePosition,
          content: cont,
          yAnchor: 2,
        });
      });
      mapObj.map?.setBounds(bounds);
    })();
  }, [togetherMapData, mapObj]);

  const addNewPlace = () => {
    if (auth.accessToken) navigate(`/togethermaps/${togethermapId}/new`);
    else setLoginModalOpen(true);
  };

  return (
    <Container>
      <MapContainer ref={mapRef} />
      <BackContainer>
        <BackButton />
      </BackContainer>
      <SubjectContainer>
        <TogetherMapTitleCard title={togetherMapData?.title} />
      </SubjectContainer>
      <NavContainer>
        <MenuButton />
      </NavContainer>
      <button
        type="button"
        style={{ backgroundColor: "red", zIndex: 2, position: "fixed" }}
        onClick={getCurrentLocation}
      >
        네브바
      </button>
      <PlaceListContainer>
        <ul>
          {togetherMapData?.placeList &&
            togetherMapData.placeList.map((place) => (
              <PlaceCard prop={place} key={place.placeId} isAdmin />
            ))}
        </ul>
      </PlaceListContainer>
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
