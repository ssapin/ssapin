import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Header from "../../components/etc/Header";
import { getPlaceInfo } from "../../utils/apis/placeApi";
import { makePin } from "../../utils/functions/maps";
import PlaceInfoModal from "./PlaceInfoModal";
import "../../styles/style.css";
import { Helmet } from "react-helmet-async";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

const { kakao } = window;

function SharedPlaceDetail() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { placeId } = useParams();
  const mapRef = useRef<HTMLDivElement>();
  const { data: placeData } = useQuery(["place", placeId], () =>
    getPlaceInfo(Number(placeId)),
  );

  const addMarker = async (position: any, map: any) => {
    const marker = new kakao.maps.Marker({
      position,
    });
    marker.setMap(map);
    const cont = makePin(placeData, "📍", () => setCreateModalOpen(true));
    await new kakao.maps.CustomOverlay({
      map,
      position,
      content: cont,
      yAnchor: 2,
    });
    return marker;
  };

  useEffect(() => {
    if (!placeData) return;
    (async () =>
      kakao.maps.load(async () => {
        const mapContainer = mapRef.current;
        const position = await new kakao.maps.LatLng(
          placeData?.lat,
          placeData?.lng,
        );
        const options = {
          center: position,
          level: 3,
        };

        const map = await new kakao.maps.Map(mapContainer, options);
        addMarker(position, map);
        setTimeout(() => {
          setCreateModalOpen(true);
        }, 1000);
      }))();
  }, [placeData]);

  return (
    <>
      <Helmet>
        <title>{placeData ? `${placeData.title} - SSAPIN` : "SSAPIN"}</title>
      </Helmet>
      <Header />
      <MapContainer ref={mapRef} />
      {createModalOpen && (
        <PlaceInfoModal
          placeId={Number(placeId)}
          onClose={() => setCreateModalOpen(false)}
        />
      )}
    </>
  );
}

export default SharedPlaceDetail;
