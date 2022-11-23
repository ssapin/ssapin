import styled from "@emotion/styled";

import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet-async";
import BackButton from "../../components/Buttons/BackButton";
import CreateButton from "../../components/Buttons/CreateButton";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { authState, campusState, userInformationState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { getMap, IBookMark, MAP_APIS } from "../../utils/apis/mapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { IMap } from "../../utils/types/map.interface";
import LoginModal from "../Login/LoginModal";
import "../../styles/style.css";
import PlaceCard from "../../components/card/PlaceCard";
import { getCurrentLocation } from "../../utils/functions/getCurrentLocation";
import PlaceInfoModal from "../Place/PlaceInfoModal";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import KakaoShareButton from "../../components/Buttons/KakaoShareButton";
import CopyModalContainer from "../../components/containers/CopyModalContainer";
import { copyURL } from "../../utils/functions/copyURL";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import { makeCampusPin, makePin } from "../../utils/functions/maps";

import MapTitleCard from "../../components/card/MapTitleCard";
import NavToggleContainer from "../../components/etc/NavToggleContainer";
import {
  Mobile,
  PC,
  Tablet,
} from "../../components/containers/MediaQueryContainer";
import ssafylogo from "../../assets/svgs/ssafylogo.svg";
import { SSAPIN_IMAGES } from "../../utils/constants/imagePaths";
import { makeHashListToSting } from "../../utils/functions/util";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Container = styled.section`
  position: fixed;
  overflow: hidden;
  height: 100%;
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
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BackContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 10px;
  left: 10px;
`;

const SubjectContainer = styled(BackContainer)`
  margin: 0 auto;
  left: 0;
  right: 0;
  width: fit-content;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  > div {
    &:nth-of-child(1) {
      ${(props) => props.theme.mq.mobile} {
        max-width: 200px;
      }
    }
    &:nth-of-child(2) {
      ${(props) => props.theme.mq.mobile} {
        display: none;
      }
    }
  }
`;

const PlaceListContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 10px;
  width: 300px;
  max-height: 80vh;
  overflow-y: scroll;
  z-index: 2;
  > ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 90%;
    margin-left: auto;
    ${(props) => props.theme.mq.mobile} {
      height: fit-content;
      max-height: 28vh;
    }
  }
  ${(props) => props.theme.mq.tablet} {
    top: auto;
    bottom: 10px;
    margin: 0 auto;
    left: 0;
    right: 0;
    height: fit-content;
    max-height: 40vh;

    > ul {
      width: 100%;
    }
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
    ${(props) => props.theme.mq.mobile} {
      flex-direction: column;
    }
  }
`;

type Coordinate = [number, number];

function Map() {
  const mapRef = useRef<HTMLDivElement>();
  const [mapObj, setMapObj] = useState({ map: null });
  const [modalOpen, setModalOpen] = useState(false);
  const [placeId, setPlaceId] = useState<number>();
  const [hashs, setHashs] = useState("");
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const userInformation = useRecoilValue(userInformationState);
  const auth = useRecoilValue(authState);
  const userCampusId = useRecoilValue(campusState);
  const [copied, setCopied] = useState(false);
  const { mapId } = useParams();
  const navigate = useNavigate();
  const cardContainerRef = useRef<HTMLDivElement>();
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const { data: mapData, refetch: mapRefetch } = useQuery<IMap, AxiosError>(
    ["map", mapId],
    () => getMap(Number(mapId)),
  );
  const [bookmark, setBookmark] = useState(false);

  const locateSSAFY = (position: any, map: any) => {
    const imageSrc = "https://ifh.cc/g/nsa8rO.png";
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
        const campusLocation = mapData
          ? CAMPUS_LIST[Number(mapData.campusId)]
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

        const map = await new kakao.maps.Map(mapContainer, options);
        locateSSAFY(position, map);
        const content = makeCampusPin(
          {
            title: CAMPUS_COORDINATE_LIST[campusLocation].place_name,
            placeId: 0,
          },
          ssafylogo,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const customOverlay = new kakao.maps.CustomOverlay({
          map,
          position,
          content,
          yAnchor: 2.3,
        });
        setMapObj({ map });
      }))();
  }, []);

  const mouseOverHandler = (idx: number) => {
    const current = cardRefs.current[idx];
    current.style.backgroundColor = "#3396F4";
    current.style.color = "#ffffff";
    cardContainerRef.current.scrollTo({
      top: current.offsetTop - cardContainerRef.current.offsetHeight / 2,
      behavior: "smooth",
    });
  };

  const mouseOutHandler = (idx: number) => {
    const current = cardRefs.current[idx];
    current.style.backgroundColor = "#ffffff";
  };

  useEffect(() => {
    if (
      !mapData ||
      !mapObj.map ||
      !mapData?.placeList ||
      mapData.placeList.length < 1
    )
      return;
    if (mapData.hashtagList.length) {
      setHashs(makeHashListToSting(mapData.hashtagList));
    }
    (async () => {
      const bounds = await new kakao.maps.LatLngBounds();
      for (let i = 0; i < mapData.placeList?.length; i++) {
        const placePosition = new kakao.maps.LatLng(
          mapData.placeList[i].lat,
          mapData.placeList[i].lng,
        );
        bounds.extend(placePosition);
        const marker = addMarker(placePosition);
        const cont = makePin(
          mapData.placeList[i],
          mapData.placeList[i].userEmoji,
          openModal,
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const overlay = new kakao.maps.CustomOverlay({
          map: mapObj.map,
          position: placePosition,
          content: cont,
          yAnchor: 2.3,
        });
        ((mark) => {
          kakao.maps.event.addListener(mark, "mouseover", () => {
            mouseOverHandler(i);
          });
          kakao.maps.event.addListener(mark, "mouseout", () => {
            mouseOutHandler(i);
          });
        })(marker);
      }
      mapObj.map?.setBounds(bounds);
      setBookmark(mapData.bookMark);
    })();
  }, [mapData, mapObj]);

  const addNewPlace = () => {
    if (auth.accessToken) navigate(`/maps/${mapId}/new`);
    else setLoginModalOpen(true);
  };

  const registerBookmark = async () => {
    if (!auth.accessToken) {
      setLoginModalOpen(true);
      return;
    }

    const body: IBookMark = {
      mapId: Number(mapId),
    };

    try {
      await axiosInstance.post(MAP_APIS.BOOKMARK, body).then(() => {
        setBookmark(true);
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
      await axiosInstance.delete(MAP_APIS.BOOKMARK, { data: body }).then(() => {
        setBookmark(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const copy = () => {
    setCopied(true);
    copyURL();
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onClose = () => {
    setModalOpen(false);
    mapRefetch();
  };

  return (
    <>
      <Helmet>
        <title>
          {mapData?.title ? `${mapData?.title} - SSAPIN` : "SSAPIN"}
        </title>
      </Helmet>
      <Container>
        <PlaceListContainer ref={cardContainerRef}>
          <ul>
            {mapData?.placeList &&
              mapData.placeList.map((place, idx) => (
                <PlaceCard
                  prop={place}
                  key={place.placeId}
                  isAdmin
                  mapId={mapData.mapId}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  refetch={mapRefetch}
                />
              ))}
          </ul>
        </PlaceListContainer>
        <ButtonListContainer>
          <MapCircleButton type="button" shape="4" height="50px" func={panTo} />
          <div>
            <MapCircleButton
              type="button"
              shape="1"
              height="50px"
              func={copy}
            />
            <KakaoShareButton
              title={mapData?.title}
              imageUrl={SSAPIN_IMAGES.MAP}
              description={hashs}
            />
          </div>
        </ButtonListContainer>

        <ButtonContainer>
          <Mobile>
            {bookmark ? (
              <MapCircleButton shape="3" func={removeBookmark} />
            ) : (
              <MapCircleButton shape="2" func={registerBookmark} />
            )}
          </Mobile>
          {(mapData?.access || userInformation.userId === mapData?.userId) && (
            <>
              <CreateButton
                text="장소 추가하기"
                type="button"
                func={addNewPlace}
              />
              <CreateButtonMobile
                text="장소 추가하기"
                type="button"
                func={addNewPlace}
              />
            </>
          )}
        </ButtonContainer>
        <BackContainer>
          <BackButton />
        </BackContainer>
        <SubjectContainer>
          {mapData && (
            <MapTitleCard
              user={
                mapData?.nickname
                  ? `${mapData?.userEmoji} ${mapData?.nickname}`
                  : null
              }
              title={
                mapData?.title
                  ? `${mapData?.mapEmoji?.substring(0, 2)} ${mapData?.title}`
                  : null
              }
            />
          )}
          <PC>
            <div>
              {bookmark ? (
                <MapCircleButton shape="3" func={removeBookmark} />
              ) : (
                <MapCircleButton shape="2" func={registerBookmark} />
              )}
            </div>
          </PC>
          <Tablet>
            <div>
              {bookmark ? (
                <MapCircleButton shape="3" func={removeBookmark} />
              ) : (
                <MapCircleButton shape="2" func={registerBookmark} />
              )}
            </div>
          </Tablet>
        </SubjectContainer>

        <NavContainer>
          <NavToggleContainer />
        </NavContainer>

        {LoginmodalOpen && (
          <ModalPortal>
            <LoginModal onClose={() => setLoginModalOpen(false)} />
          </ModalPortal>
        )}
        {modalOpen && (
          <ModalPortal>
            <PlaceInfoModal placeId={placeId} onClose={onClose} />
          </ModalPortal>
        )}
        {copied && (
          <ModalPortal>
            <CopyModalContainer onClose={() => setCopied(false)}>
              <p>💻URL을 클립보드에 복사했어요.</p>
            </CopyModalContainer>
          </ModalPortal>
        )}
        <MapContainer ref={mapRef} />
      </Container>
    </>
  );
}

export default Map;
