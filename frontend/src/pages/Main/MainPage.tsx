import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import Footer from "../../components/etc/Footer";
import MapSearch from "../../components/etc/MapSearch";
import Question from "./Question";
import { pixelToRem } from "../../utils/functions/util";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import UserRanking from "./UserRanking";
import PlaceRanking from "./PlaceRanking";
import MapRanking from "./MapRanking";
import MapList from "./MapList";
import TogetherMapList from "./TogetherMapList";
import Navbar from "../Navbar/Navbar";
import { campusState } from "../../store/atom";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import { TOGETHERMAP_APIS } from "../../utils/apis/togethermapApi";
import { IMap } from "../../utils/types/map.interface";
import { MAP_APIS } from "../../utils/apis/mapApi";
import axiosInstance from "../../utils/apis/api";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IUserRanking } from "../../utils/types/user.interface";
import { IPlaceRanking } from "../../utils/types/place.interface";
import { PLACE_APIS } from "../../utils/apis/placeApi";
import USER_APIS from "../../utils/apis/userApis";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import CreateMapModal from "../CreateMap/CreateMapModal";

const HeadContainer = styled.div`
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  width: 100%;
  height: 55%;
  text-align: center;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    background-color: ${(props) => props.theme.colors.mainBlue};
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Searchbar = styled.div`
  width: 100%;
  height: 30%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 100%;
  height: fit-content;
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
`;

function MainPage() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState<boolean>(true);
  const [togethermaps, setTogethermaps] = useState<ITogetherMap[]>([]);
  const [maps, setMaps] = useState<IMap[]>([]);
  const [rankingmaps, setRankingmaps] = useState<IMap[]>([]);
  const [rankingusers, setRankingusers] = useState<IUserRanking[]>([]);
  const [rankingplaces, setRankingplaces] = useState<IPlaceRanking>();

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);
  const [campusId, setCampusId] = useRecoilState(campusState);

  const toggleActive = (key: number) => {
    setCampusId(key);
  };

  const navigate = useNavigate();
  const moveToCreate = () => {
    navigate("/mobileCreate");
  };

  const { data: togetherData, refetch: togetherRefetch } = useQuery<
    AxiosResponse<ITogetherMap[]>,
    AxiosError
  >(
    [`${campusId} - togetherMapList`],
    () => axiosInstance.get(TOGETHERMAP_APIS.GET_TOGETHERMAP_LIST(campusId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: mapData, refetch: mapRefetch } = useQuery<
    AxiosResponse<IMap[]>,
    AxiosError
  >(
    [`${campusId} - mapList`],
    () => axiosInstance.get(MAP_APIS.getMapList(campusId, 0, [], "")),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: mapRankingData, refetch: mapRankingRefetch } = useQuery<
    AxiosResponse<IMap[]>,
    AxiosError
  >(
    [`${campusId} - mapRankingList`],
    () => axiosInstance.get(MAP_APIS.GET_MAP_RANKING(campusId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: userRankingData, refetch: userRankingRefetch } = useQuery<
    AxiosResponse<IUserRanking[]>,
    AxiosError
  >(
    [`${campusId} - userRankingList`],
    () => axiosInstance.get(USER_APIS.getUserRanking(campusId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: placeRankingData, refetch: placeRankingRefetch } = useQuery<
    AxiosResponse<IPlaceRanking>,
    AxiosError
  >(
    [`${campusId} - placeRankingList`],
    () => axiosInstance.get(PLACE_APIS.getPlaceRanking(campusId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    togetherRefetch();
    mapRefetch();
    mapRankingRefetch();
    userRankingRefetch();
    placeRankingRefetch();
  }, [campusId]);

  useEffect(() => {
    if (togetherData?.data) {
      setTogethermaps(togetherData.data);
    }
    if (mapData?.data) {
      setMaps(mapData.data.content);
    }
    if (mapRankingData?.data) {
      setRankingmaps(mapRankingData.data);
    }
    if (userRankingData?.data) {
      setRankingusers(userRankingData.data?.userRankingList);
    }
    if (placeRankingData?.data) {
      setRankingplaces(placeRankingData.data);
    }
    setLoading(false);
  }, [
    togetherData,
    mapData,
    mapRankingData,
    userRankingData,
    placeRankingData,
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(true);
  };

  const [keyword, setKeyword] = useState("");
  const onChangeKeyword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setKeyword(e.target.value);
  };

  const moveToSearch = () => {
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <QuestionContainer>
          <Swiper
            slidesPerView={1}
            loop
            pagination={{
              clickable: true,
            }}
            effect="fade"
            navigation
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            speed={800}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            className="mySwiper"
          >
            {!loading &&
              togethermaps.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <SwiperSlide key={i}>
                  <Question item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        </QuestionContainer>
        <Searchbar>
          <MapSearch
            width="50%"
            height="30%"
            changeFunc={onChangeKeyword}
            clickFunc={moveToSearch}
          />
        </Searchbar>
      </HeadContainer>
      <MainContainer>
        <UserRanking users={rankingusers} />
        <PlaceRanking places={rankingplaces} />
        <MapRanking maps={rankingmaps} />
        <MapList maps={maps} />
        <TogetherMapList maps={togethermaps} />
      </MainContainer>
      <FixContainer>
        <MoveToTopButton />
        {innerWidth > 950 ? (
          <CreateButton type="button" text="지도 만들기" func={handleModal} />
        ) : (
          <CreateButtonMobile type="button" func={moveToCreate} />
        )}
        {modalOpen && (
          <ModalPortal>
            <CreateMapModal onClose={() => setModalOpen(false)} />
          </ModalPortal>
        )}
      </FixContainer>
      <Footer />
    </>
  );
}

export default MainPage;
