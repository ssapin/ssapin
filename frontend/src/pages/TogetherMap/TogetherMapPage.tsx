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
import PlaceCard from "../../components/card/PlaceCard";
import { getCurrentLocation } from "../../utils/functions/getCurrentLocation";
import MenuButton from "../../components/Buttons/MenuButton";
import PlaceInfoModal from "../Place/PlaceInfoModal";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import KakaoShareButton from "../../components/Buttons/KakaoShareButton";
import CopyModalContainer from "../../components/containers/CopyModalContainer";
import { copyURL } from "../../utils/functions/copyURL";

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

const ButtonListContainer = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  > div {
    display: flex;
    gap: 0.5rem;
  }
`;

type Coordinate = [number, number];

interface ICenter {
  title: string;
  placeId: number;
}

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
  const [copied, setCopied] = useState(false);

  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    async () => getTogetherMap(Number(togethermapId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const locateSSAFY = (position: any, map: any) => {
    const imageSrc =
      "https://trippiece607.s3.ap-northeast-2.amazonaws.com/building.png";
    const imageSize = new kakao.maps.Size(30, 40);
    const imgOptions = {};
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });
    marker.setMap(map);
    return marker;
  };

  const addMarker = (position: any) => {
    const marker = new kakao.maps.Marker({
      position,
    });
    marker.setMap(mapObj.map);
    return marker;
  };

  const openModal = (id: number) => {
    setModalOpen(true);
    setPlaceId(id);
  };

  const makePin = (place: IPlace | ICenter, avatar?: string) => {
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
        openModal(place.placeId);
      };
    }

    return container;
  };

  const panTo = async () => {
    try {
      const response: GeolocationPosition =
        (await getCurrentLocation()) as GeolocationPosition;
      const [lat, lng] = [response.coords.latitude, response.coords.longitude];
      const myPosition = new kakao.maps.LatLng(lat, lng);

      mapObj.map?.panTo(myPosition);

      setTimeout(() => {
        mapObj.map?.setLevel(2, {
          animate: {
            duration: 500,
          },
        });
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () =>
      kakao.maps.load(async () => {
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
        locateSSAFY(position, map);
        // const img = "";
        const content = makePin(
          {
            title: CAMPUS_COORDINATE_LIST[campusLocation].place_name,
            placeId: 0,
          },
          "🗼",
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const customOverlay = new kakao.maps.CustomOverlay({
          map,
          position,
          content,
          yAnchor: 2,
        });
        setMapObj({ map });
      }))();
  }, []);

  useEffect(() => {
    if (!togetherMapData) return;
    if (!mapObj.map) return;
    if (!togetherMapData?.placeList || togetherMapData.placeList.length < 1)
      return;
    (async () => {
      const bounds = await new kakao.maps.LatLngBounds();
      togetherMapData.placeList.forEach(async (place) => {
        const placePosition = new kakao.maps.LatLng(place.lat, place.lng);
        bounds.extend(placePosition);
        addMarker(placePosition);
        const cont = makePin(place, place.userEmoji);
        await new kakao.maps.CustomOverlay({
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

  const copy = () => {
    setCopied(true);
    copyURL();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
      <ButtonListContainer>
        <MapCircleButton type="button" shape="4" height="50px" func={panTo} />
        <div>
          <MapCircleButton type="button" shape="1" height="50px" func={copy} />
          <KakaoShareButton />
        </div>
      </ButtonListContainer>
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
          <PlaceInfoModal
            placeId={placeId}
            onClose={() => setModalOpen(false)}
          />
        </ModalPortal>
      )}
      {copied && (
        <ModalPortal>
          <CopyModalContainer onClose={() => setCopied(false)}>
            URL을 복사했어요
          </CopyModalContainer>
        </ModalPortal>
      )}
    </Container>
  );
}

export default TogetherMap;
