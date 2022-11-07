import styled from "@emotion/styled";
import { AxiosError } from "axios";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "../../components/Buttons/BackButton";
import CreateButton from "../../components/Buttons/CreateButton";
import TogetherMapTitleCard from "../../components/card/TogetherMapTitleCard";
import { campusState } from "../../store/atom";
import { getTogetherMap } from "../../utils/apis/togethermapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

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
  const { togethermapId } = useParams();
  const navigate = useNavigate();
  const userCampusId = useRecoilValue(campusState);
  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    () => getTogetherMap(Number(togethermapId)),
  );

  console.log(togetherMapData);
  useEffect(() => {
    const [lat, lan]: Coordinate = togetherMapData
      ? [
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .lat,
          CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .lan,
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
    navigate(`/togethermaps/${togethermapId}/new`);
  };

  return (
    <Container>
      {/* <SearchPlace /> */}
      {/* <NewPlace /> */}
      <MapContainer ref={mapRef} />
      <BackContainer>
        <BackButton />
        <TogetherMapTitleCard title={togetherMapData?.title} />
      </BackContainer>
      <ButtonContainer>
        <CreateButton text="장소 추가하기" type="button" func={addNewPlace} />
      </ButtonContainer>
    </Container>
  );
}

export default TogetherMap;
