import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import USER_APIS from "../../utils/apis/useApis";
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
import { ITogetherMap } from "../../utils/types/togethermap.interface";
import { togethermapApis } from "../../utils/apis/togethermapApi";
import { campusState } from "../../store/atom";
import { IMap } from "../../utils/types/map.interface";
import { mapApis } from "../../utils/apis/mapApi";
import axiosInstance from "../../utils/apis/api";

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
  z-index: 999;

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

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_API_KEY
  }&redirect_uri=${USER_APIS.REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
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

  const { data: data1, refetch: refetch1 } = useQuery<
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

  const { data: data2, refetch: refetch2 } = useQuery<
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

  const { data: data3, refetch: refetch3 } = useQuery<
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

  useEffect(() => {
    refetch1();
    refetch2();
    refetch3();
  }, [campusId]);

  useEffect(() => {
    if (data1?.data) {
      setTogethermaps(data1.data);
    }
    if (data2?.data) {
      console.log(data2.data);
      setMaps(data2.data.content);
    }
    if (data3?.data) {
      setRankingmaps(data3.data);
    }
    setLoading(false);
  }, [data1, data2, data3]);

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <button type="button" onClick={handleKakaoLogin}>
          카카오톡 로그인
        </button>
        <QuestionContainer>
          {/* <Carousel interval={4500} animation="fade" duration={1000}>
            {!loading &&
              togethermaps.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Question key={i} item={item} />
              ))}
          </Carousel> */}
        </QuestionContainer>
        <Searchbar>
          <MapSearch width="50%" height="30%" />
        </Searchbar>
      </HeadContainer>
      <MainContainer>
        <UserRanking />
        <PlaceRanking />
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
