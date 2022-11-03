import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function TogetherMap() {
  const mapRef = useRef<HTMLDivElement>();
  const { togethermapId } = useParams();
  console.log(togethermapId);
  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <>
      <MapContainer ref={mapRef} />
      <p>cakao</p>
    </>
  );
}

export default TogetherMap;
