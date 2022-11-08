import styled from "@emotion/styled";
import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "../../components/Buttons/BackButton";
import CreateButton from "../../components/Buttons/CreateButton";
import MapTitleCard from "../../components/card/MapTitleCard";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { authState, campusState } from "../../store/atom";
import { getMap } from "../../utils/apis/mapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { IMap } from "../../utils/types/map.interface";
import LoginModal from "../Login/LoginModal";

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

function MapPage() {
  const mapRef = useRef<HTMLDivElement>();
  const { mapId } = useParams();
  const navigate = useNavigate();
  const userCampusId = useRecoilValue(campusState);
  const { data: mapData } = useQuery<IMap, AxiosError>(["map", mapId], () =>
    getMap(Number(mapId)),
  );
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const [lat, lan]: Coordinate = mapData
      ? [
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(mapData.campusId)]].lat,
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(mapData.campusId)]].lan,
        ]
      : [
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].lat,
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].lan,
        ];
    const mapContainer = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(lat, lan),
      level: 3,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new kakao.maps.Map(mapContainer, options);
  }, []);

  const addNewPlace = () => {
    if (auth.accessToken) navigate(`/maps/${mapId}/new`);
    else setLoginModalOpen(true);
  };

  return (
    <Container>
      {/* <SearchPlace /> */}
      {/* <NewPlace /> */}
      <MapContainer ref={mapRef} />
      <BackContainer>
        <BackButton />
        <MapTitleCard
          title={mapData?.title}
          user={`${mapData?.userEmoji} ${mapData?.nickname}`}
        />
      </BackContainer>
      <ButtonContainer>
        <CreateButton text="장소 추가하기" type="button" func={addNewPlace} />
      </ButtonContainer>
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
    </Container>
  );
}

export default MapPage;
