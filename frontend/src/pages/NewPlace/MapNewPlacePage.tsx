/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import styled from "@emotion/styled";
import { AxiosError } from "axios";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  forwardRef,
  LegacyRef,
} from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";
import { authState, campusState } from "../../store/atom";
import {
  getMap,
  IBookMark,
  registerMapBookmark,
  removeMapBookmark,
} from "../../utils/apis/mapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { IKakaoPlace } from "../../utils/types/place.interface";
import { IMap } from "../../utils/types/map.interface";
import BackButton from "../../components/Buttons/BackButton";
import MapTitleCard from "../../components/card/MapTitleCard";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import { pixelToRem } from "../../utils/functions/util";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import AddPlaceModal from "../Search/AddPlaceModal";
import LoginModal from "../Login/LoginModal";
import NavToggleContainer from "../../components/etc/NavToggleContainer";
import { Helmet } from "react-helmet-async";

const Conatiner = styled.section`
  position: relative;
`;

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: relative;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 10px;
  z-index: 1;
  width: 378px;
  max-height: 70vh;

  ${(props) => props.theme.mq.tablet} {
    top: auto;
    bottom: 100px;
    margin: 0 auto;
    left: 0;
    right: 0;
    height: fit-content;
    max-height: 40vh;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 83px;
  border-radius: 20px 20px 0px 0px;
  //background-color: ${(props) => props.theme.colors.lightBlue};
  background-color: rgba(51, 150, 244, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 83px;
  border-radius: 20px 20px 0px 0px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
`;

const Input = styled.input`
  width: 251px;
  height: 43px;
  border-radius: 10px;
  border: none;
  margin-right: 10px;
  padding: 0 1rem;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  color: ${(props) => props.theme.colors.gray900};
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.mainYellow};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  height: 43px;
  padding: 0 1rem;
  box-shadow: 0 ${pixelToRem(2)} ${pixelToRem(2)} 0 rgba(0, 0, 0, 0.25);
`;

const SearchInformationContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  max-height: inherit;
  border-radius: 0 0 15px 15px;
  padding: 0 0.5rem 0.5rem 0.5rem;
  overflow-y: scroll;
  ${(props) => props.theme.mq.mobile} {
    height: calc(50vh - 83px);
  }
  .pagination {
    width: 100%;
    text-align: center;
  }
`;

const PaginationButton = styled.button`
  margin: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.s1};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};

  :hover {
    scale: 1.1;
  }
`;

const BackContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 10px;
  left: 10px;
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;

  button {
    margin-bottom: 1rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }

  ${(props) => props.theme.mq.mobile} {
    right: 1rem;
    bottom: 1rem;
  }
`;

const NavContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 10px;
  right: 10px;
`;

const SubjectContainer = styled(BackContainer)`
  margin: 0 auto;
  left: 0;
  right: 0;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const SeachResultContainer = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-radius: 17px;
  background-color: rgba(255, 255, 255, 0.1);
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};

  text-align: center;
`;

const NoResultContainer = styled.div`
  margin-top: 3%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.1);

  border-radius: 10px;
  text-align: center;
`;

const FontH3 = styled.div`
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

const FontS1 = styled.div`
  margin-top: 3%;
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.s1};
  font-size: ${(props) => props.theme.fontSizes.s1};
`;

const { kakao } = window;
type Coordinate = [number, number];

export interface Pagination {
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  first: number;
  current: number;
  last: number;
  perPage: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (idx: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

function MapNewPlace() {
  const [keyword, setKeyword] = useState("");
  const [mapObj, setMapObj] = useState({
    map: null,
    ps: null,
    infowindow: null,
  });
  const [markerList, setMarkerList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const mapRefs = useRef<HTMLDivElement>();
  const menuWrapRef = useRef<HTMLDivElement>();
  const pagenationRef = useRef<HTMLDivElement>();
  const itemRefs = useRef([]);
  const { mapId } = useParams();
  const userCampusId = useRecoilValue(campusState);

  const { data: mapData } = useQuery<IMap, AxiosError>(["map", mapId], () =>
    getMap(Number(mapId)),
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const addMarker = (position: number, idx: number) => {
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
    const imageSize = new kakao.maps.Size(36, 37);
    const imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691),
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
      offset: new kakao.maps.Point(13, 37),
    };
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
    });
    marker.setMap(mapObj.map);
    return marker;
  };

  const displayInfoWindow = (marker: any, title: string) => {
    mapObj.infowindow?.setContent(
      `<div style="padding:10px;font-size:16px;width:150px;">${title}</div>`,
    );
    mapObj.infowindow?.open(mapObj.map, marker);
  };

  const displayPagination = (pagination: Pagination) => {
    const pageList = Array(Number(pagination.last))
      .fill(0)
      .map((_, i) => {
        return {
          number: i + 1,
          func: () => pagination.gotoPage(i + 1),
        };
      });
    setPaginationList(pageList);
  };
  const displayPlaces = (places: IKakaoPlace[]) => {
    const menuWrap = menuWrapRef.current;
    const bounds = new kakao.maps.LatLngBounds();
    // removeMarker();
    const newPlaceList = [];
    const newMarkerList: any[] = [];
    for (let i = 0; i < places.length; i++) {
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = addMarker(placePosition, i);
      newMarkerList.push(marker);
      newPlaceList.push({ index: i, place: places[i] });
      bounds.extend(placePosition);
      ((mark, title) => {
        kakao.maps.event.addListener(mark, "mouseover", () => {
          displayInfoWindow(mark, title);
        });
        kakao.maps.event.addListener(mark, "mouseout", () => {
          mapObj.infowindow.close();
        });
      })(marker, places[i].place_name);
    }

    setMarkerList((prev) => {
      prev.forEach((marker) => marker.setMap(null));
      return newMarkerList;
    });
    setPlaceList(newPlaceList);
    menuWrap.scrollTop = 0;
    mapObj.map.setBounds(bounds);
  };

  const placesSearchCB = (
    data: IKakaoPlace[],
    status: string,
    pagination: Pagination,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      displayPagination(pagination);
    } else setPlaceList([]);

    if (data.length === 0) setFlag(false);
    else setFlag(true);
  };

  const searchKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) return;
    mapObj.ps?.keywordSearch(
      `${CAMPUS_LIST[mapData.campusId]} ${keyword}`,
      placesSearchCB,
    );
    setFirstserchFlag(false);
  };

  useEffect(() => {
    const [lat, lan]: Coordinate = mapData
      ? [
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(mapData.campusId)]].y,
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(mapData.campusId)]].x,
        ]
      : [
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].y,
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[userCampusId]].x,
        ];
    const container = mapRefs.current;
    const options = {
      center: new kakao.maps.LatLng(lat, lan),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    setMapObj({ map, ps, infowindow });
  }, []);

  const [placeResultFlag, setFlag] = useState(true);
  const [placeFirstSearch, setFirstserchFlag] = useState(true);

  const mouseOver = (idx: number, title: string) => {
    displayInfoWindow(markerList[idx], title);
  };

  const mouseLeave = () => {
    mapObj.infowindow.close();
  };
  const registerBookmark = () => {
    const req: IBookMark = {
      mapId: Number(mapId),
    };

    registerMapBookmark(req);
  };

  const removeBookmark = () => {
    const req: IBookMark = {
      mapId: Number(mapId),
    };

    removeMapBookmark(req);
  };

  return (
    <>
      <Helmet>
        <title>
          {mapData?.title ? `${mapData?.title} - SSAPIN` : "SSAPIN"}
        </title>
      </Helmet>
      <Conatiner>
        <MapContainer ref={mapRefs} />

        <SearchContainer>
          <Form onSubmit={searchKeyword}>
            <div>
              <Input
                placeholder="Search Place..."
                onChange={onChange}
                value={keyword}
              />
              <SearchButton type="submit">검색</SearchButton>
            </div>
          </Form>
          <SearchInformationContainer ref={menuWrapRef}>
            <ul>
              {placeList?.map((place, idx) => (
                <PlaceCard
                  {...place}
                  key={place.index}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  mouseOver={() => mouseOver(idx, place.place.place_name)}
                  mouseLeave={mouseLeave}
                  mapId={mapId}
                />
              ))}
            </ul>
            {!placeResultFlag && (
              <NoResultContainer>
                <FontH3>😱😭 검색된 장소가 없어요😭😱 </FontH3>
                <FontS1>
                  검색어의 철자가 정확한지 다시 한번 확인해 주세요
                </FontS1>
              </NoResultContainer>
            )}
            {placeResultFlag ? (
              <div ref={pagenationRef} className="pagination">
                {paginationList.map((page) => (
                  <PaginationButton
                    type="button"
                    key={page.number}
                    onClick={page.func}
                  >
                    {page.number}
                  </PaginationButton>
                ))}
              </div>
            ) : null}
            {placeFirstSearch && placeResultFlag && (
              <SeachResultContainer>
                <h3>🤟 장소를 검색해주세요 🤟 </h3>
              </SeachResultContainer>
            )}
          </SearchInformationContainer>
        </SearchContainer>
        <BackContainer>
          <BackButton />
        </BackContainer>
        <SubjectContainer>
          <MapTitleCard
            user={`${mapData?.userEmoji} ${mapData?.nickname}`}
            title={`${mapData?.mapEmoji.substring(0, 2)}${mapData?.title}`}
          />
        </SubjectContainer>
        <NavContainer>
          <NavToggleContainer />
        </NavContainer>
      </Conatiner>
    </>
  );
}

export default MapNewPlace;

const List = styled.li`
  position: relative;
  border-bottom: 1px solid #888;
  cursor: pointer;
  min-height: 65px;
`;

const MarkerBg = styled.span<{ index: number }>`
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png")
    no-repeat;
  background-position: 0 ${(props) => -10 - props.index * 46}px;
`;

const PlaceInfoContainer = styled.div`
  padding: 10px 0 10px 55px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: bold;
    margin-block-start: 1.67px;
    margin-block-end: 1.67px;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.s1bold};
  }
  span {
    display: block;
    margin-top: 4px;
    &:last-of-type {
      color: #009900;
    }
    font-size: ${(props) => props.theme.fontSizes.s2};
    font-family: ${(props) => props.theme.fontFamily.s3};
  }
`;

const InfoInnerContainer = styled.div`
  position: relative;
`;

const CreateButton = styled.button`
  background-color: ${(props) => props.theme.colors.lightBlue};
  position: absolute;
  bottom: 0;
  right: 5px;
  border-radius: 10px;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.gray0};
  transition: all 0.2s ease-in;
  align-items: center;
  display: flex;
  justify-content: center;
  font-family: ${(props) => props.theme.fontFamily.s1};

  &:hover {
    transform: scale(1.03);
    background-color: ${(props) => props.theme.colors.mainBlue};
  }

  svg {
    width: 15px;
    height: auto;
  }
`;

const Jibun = styled.span`
  padding-left: 26px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png")
    no-repeat;
  color: ${(props) => props.theme.colors.gray400};
`;

interface PlaceCardProps {
  index: number;
  mouseOver: () => void;
  mouseLeave: () => void;
  place: IKakaoPlace;
  mapId: number;
}

const PlaceCard = forwardRef(
  (
    { index, place, mouseOver, mouseLeave, mapId }: PlaceCardProps,
    ref: LegacyRef<HTMLLIElement>,
  ) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [LoginmodalOpen, setLoginModalOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const auth = useRecoilValue(authState);

    const handleModal = () => {
      if (auth.accessToken) setModalOpen(true);
      else setLoginModalOpen(true);
    };

    return (
      <>
        <FixContainer>
          {modalOpen && (
            <ModalPortal>
              <AddPlaceModal
                onClose={() => setModalOpen(false)}
                place={place}
                mapId={mapId}
                type={1}
              />
            </ModalPortal>
          )}
          {LoginmodalOpen && (
            <ModalPortal>
              <LoginModal onClose={() => setLoginModalOpen(false)} />
            </ModalPortal>
          )}
        </FixContainer>
        <List ref={ref} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
          <MarkerBg index={index} />
          <PlaceInfoContainer>
            <InfoInnerContainer>
              <h4>{place.place_name}</h4>
              {place.road_address_name ? (
                <>
                  <span>{place.road_address_name}</span>
                  <Jibun>{place.address_name}</Jibun>
                </>
              ) : (
                <span>{place.address_name}</span>
              )}
              <span>{place.phone}</span>
              {isRegister && <span>이미 추가된 장소입니다.</span>}
              {!isRegister && (
                <CreateButton type="button" onClick={handleModal}>
                  <p>장소 추천</p>
                  <PlusIcon className="plus" />
                </CreateButton>
              )}
            </InfoInnerContainer>
          </PlaceInfoContainer>
        </List>
      </>
    );
  },
);
