import styled from "@emotion/styled";
import { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "../../components/Buttons/BackButton";
import CreateButton from "../../components/Buttons/CreateButton";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import MapTitleCard from "../../components/card/MapTitleCard";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { authState, campusState, userInformationState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import {
  getMap,
  IBookMark,
  MAP_APIS,
  registerMapBookmark,
  removeMapBookmark,
} from "../../utils/apis/mapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { isUserAccess } from "../../utils/functions/place";
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
  const { data: mapData, refetch: mapRefetch } = useQuery<IMap, AxiosError>(
    ["map", mapId],
    () => getMap(Number(mapId)),
  );
  const userInformation = useRecoilValue(userInformationState);
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

  const registerBookmark = async () => {
    const body: IBookMark = {
      mapId: Number(mapId),
    };

    try {
      const response: AxiosResponse<IMap> = await axiosInstance
        .post(MAP_APIS.BOOKMARK, body)
        .then(() => {
          mapRefetch();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookmark = async () => {
    const body: IBookMark = {
      mapId: Number(mapId),
    };

    try {
      const response: AxiosResponse<IMap> = await axiosInstance
        .delete(MAP_APIS.BOOKMARK, { data: body })
        .then(() => {
          mapRefetch();
        });
    } catch (error) {
      console.log(error);
    }
  };

  isUserAccess(userInformation.userId, mapData?.userId);

  return (
    <Container>
      {/* <SearchPlace /> */}
      {/* <NewPlace /> */}
      <MapContainer ref={mapRef} />
      <BackContainer>
        <BackButton />
        {mapData?.bookMark ? (
          <MapCircleButton shape="3" func={removeBookmark} />
        ) : (
          <MapCircleButton shape="2" func={registerBookmark} />
        )}

        <MapTitleCard
          title={mapData?.title}
          user={`${mapData?.userEmoji} ${mapData?.nickname}`}
        />
      </BackContainer>
      <ButtonContainer>
        {(mapData?.access || isUserAccess) && (
          <CreateButton text="장소 추가하기" type="button" func={addNewPlace} />
        )}
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
