/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import styled from "@emotion/styled";
import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import BackButton from "../../components/Buttons/BackButton";
import TogetherMapNoticeCard from "../../components/card/TogetherMapNoticeCard";
import TogetherMapTitleCard from "../../components/card/TogetherMapTitleCard";
import NavToggleContainer from "../../components/etc/NavToggleContainer";
import { campusState } from "../../store/atom";
import { getTogetherMap } from "../../utils/apis/togethermapApi";
import {
  CAMPUS_COORDINATE_LIST,
  CAMPUS_LIST,
} from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";
import { IKakaoPlace } from "../../utils/types/place.interface";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import { MemoizedPlaceCard } from "./PlaceCard";

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
  max-width: 90vw;

  ${(props) => props.theme.mq.tablet} {
    top: auto;
    bottom: 80px;
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

const Input = styled.input`
  width: 251px;
  max-width: 60vw;
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
  color: ${(props) => props.theme.colors.gray900};
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

function TogetherNewPlace() {
  const [keyword, setKeyword] = useState("");
  const [mapObj, setMapObj] = useState({
    map: null,
    ps: null,
    infowindow: null,
  });
  const [markerList, setMarkerList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [paginationList, setPaginationList] = useState([]);
  const [overlayList, setOverlayList] = useState([]);
  const mapRefs = useRef<HTMLDivElement>();
  const menuWrapRef = useRef<HTMLDivElement>();
  const pagenationRef = useRef<HTMLDivElement>();
  const itemRefs = useRef([]);
  const { togethermapId } = useParams();
  const userCampusId = useRecoilValue(campusState);
  const [placeResultFlag, setFlag] = useState(true);
  const [placeFirstSearch, setFirstserchFlag] = useState(true);
  const { data: togetherMapData } = useQuery<ITogetherMap, AxiosError>(
    ["together-map", togethermapId],
    () => getTogetherMap(Number(togethermapId)),
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

  const mouseOverHandler = (overlay: any) => {
    overlay.setMap(mapObj?.map);
  };

  const mouseOutHanvler = (overlay: any) => {
    overlay.setMap(null);
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
    const newPlaceList = [];
    const newMarkerList: any[] = [];
    const newOverlayList = [];
    for (let i = 0; i < places.length; i++) {
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = addMarker(placePosition, i);
      const content = `
      <div class="marker_overlay shadow" style="margin:0 auto;"><div class="place_name text_primary">${places[i].place_name}</div></div>`;

      const overlay = new kakao.maps.CustomOverlay({
        map: mapObj.map,
        position: placePosition,
        content,
        yAnchor: 2.3,
      });
      overlay.setMap(null);
      newOverlayList.push(overlay);
      newMarkerList.push(marker);
      newPlaceList.push({ index: i, place: places[i] });
      bounds.extend(placePosition);
      ((mark) => {
        kakao.maps.event.addListener(mark, "mouseover", () => {
          mouseOverHandler(overlay);
        });
        kakao.maps.event.addListener(mark, "mouseout", () => {
          mouseOutHanvler(overlay);
        });
      })(marker);
    }
    setOverlayList(newOverlayList);
    setMarkerList(() => {
      markerList.forEach((marker) => marker.setMap(null));
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
      `${CAMPUS_LIST[togetherMapData.campusId]} ${keyword}`,
      placesSearchCB,
    );
    setFirstserchFlag(false);
  };

  useEffect(() => {
    const [lat, lan]: Coordinate = togetherMapData
      ? [
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .y,
          +CAMPUS_COORDINATE_LIST[CAMPUS_LIST[Number(togetherMapData.campusId)]]
            .x,
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

  return (
    <>
      <Helmet>
        <title>
          {togetherMapData?.title
            ? `${togetherMapData?.title} - SSAPIN`
            : "SSAPIN"}
        </title>
      </Helmet>
      <Conatiner>
        <MapContainer ref={mapRefs} />
        <BackContainer>
          <BackButton type="togethermap" mapId={togethermapId} />
        </BackContainer>
        <SubjectContainer>
          <TogetherMapTitleCard title={togetherMapData?.title} />
          <TogetherMapNoticeCard />
        </SubjectContainer>
        <NavContainer>
          <NavToggleContainer />
        </NavContainer>
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
                <MemoizedPlaceCard
                  {...place}
                  key={place.index}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  mouseOver={() => mouseOverHandler(overlayList[idx])}
                  mouseLeave={() => mouseOutHanvler(overlayList[idx])}
                  mapId={togethermapId}
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
      </Conatiner>
    </>
  );
}

export default TogetherNewPlace;
