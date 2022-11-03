import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
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
import ModalPortal from "../../components/containers/ModalPortalContainer";
import LoginModal from "../Login/LoginModal";
import useUserActions, {
  useGetUserInformation,
} from "../../utils/hooks/useUserActions";
import { authState, campusState } from "../../store/atom";
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import { togethermapApis } from "../../utils/apis/togethermapApi";
import { IMap } from "../../utils/types/map.interface";
import { mapApis } from "../../utils/apis/mapApi";
import axiosInstance from "../../utils/apis/api";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IUserRanking } from "../../utils/types/user.interface";
import { IPlaceRanking } from "../../utils/types/place.interface";
import { placeApis } from "../../utils/apis/placeApi";
import USER_APIS from "../../utils/apis/useApis";

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
  const [modalOpen, setModalOpen] = useState(false);
  const useUserAction = useUserActions();
  const auth = useRecoilValue(authState);
  const useGetInformation = useGetUserInformation();
  const [loading, setLoading] = useState<boolean>(true);
  const [togethermaps, setTogethermaps] = useState<ITogetherMap[]>([]);
  const [maps, setMaps] = useState<IMap[]>([]);
  const [rankingmaps, setRankingmaps] = useState<IMap[]>([]);
  const [rankingusers, setRankingusers] = useState<IUserRanking[]>([]);
  const [rankingplaces, setRankingplaces] = useState<IPlaceRanking>();

  const handleModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });
  const [campusId, setCampusId] = useRecoilState(campusState);

  const toggleActive = (key: number) => {
    setCampusId(key);
  };

  const { data: togetherData, refetch: togetherRefetch } = useQuery<
    AxiosResponse<ITogetherMap[]>,
    AxiosError
  >(
    [`${campusId} - togetherMapList`],
    () => axiosInstance.get(togethermapApis.getTogetherMapList(campusId)),
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
    () => axiosInstance.get(mapApis.getMapList(campusId, 0, [], "")),
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
    () => axiosInstance.get(mapApis.getMapRanking(campusId)),
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
    () => axiosInstance.get(placeApis.getPlaceRanking(campusId)),
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
      setRankingusers(userRankingData.data);
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

  const handleLogout = () => {
    useUserAction.logout();
  };

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <button type="button" onClick={() => useGetInformation.getUser()}>
          정보주세요
        </button>
        {auth?.accessToken ? (
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button type="button" onClick={handleModal}>
            로그인
          </button>
        )}
        {modalOpen && (
          <ModalPortal>
            <LoginModal onClose={() => setModalOpen(false)} />
          </ModalPortal>
        )}
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
          <MapSearch width="50%" height="30%" />
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
        {innerWidth > 650 ? (
          <CreateButton type="button" text="지도 만들기" />
        ) : (
          <CreateButtonMobile type="button" />
        )}
      </FixContainer>
      <Footer />
    </>
  );
}

export default MainPage;
