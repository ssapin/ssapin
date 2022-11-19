import { ChangeEvent, FormEvent, lazy, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import { useQueries } from "react-query";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MapSearch from "../../components/etc/MapSearch";
import { pixelToRem } from "../../utils/functions/util";
import Header from "../../components/etc/Header";
import { authState, campusState } from "../../store/atom";
import { getTogetherMapList } from "../../utils/apis/togethermapApi";
import { getPlaceRanking } from "../../utils/apis/placeApi";
import { getUserRanking } from "../../utils/apis/userApis";

import { LessPC } from "../../components/containers/MediaQueryContainer";

import MapRanking from "./MapRanking";
import MapList from "./MapList";
import HeaderSwiper from "./HeaderSwiper";

const UserRanking = lazy(() => import("./UserRanking"));
const PlaceRanking = lazy(() => import("./PlaceRanking"));
const TogetherMapList = lazy(() => import("./TogetherMapList"));
const Footer = lazy(() => import("../../components/etc/Footer"));
const IntersectContainer = lazy(
  () => import("../../components/containers/IntersectContainer"),
);
const ModalPortal = lazy(
  () => import("../../components/containers/ModalPortalContainer"),
);
const LoginModal = lazy(() => import("../Login/LoginModal"));
const CreateMapModal = lazy(() => import("../CreateMap/CreateMapModal"));
const CreateButtonMobile = lazy(
  () => import("../../components/Buttons/CreateButtonMobile"),
);
const MobileCampusButton = lazy(
  () => import("../../components/Buttons/MobileCampusButton"),
);
const CreateButton = lazy(
  () => import("../../components/Buttons/CreateButton"),
);
const MoveToTopButton = lazy(
  () => import("../../components/Buttons/MoveToTopButton"),
);

const HeadContainer = styled.header`
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
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    background-color: ${(props) => props.theme.colors.mainBlue};
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

const MainContainer = styled.main`
  width: 100%;
  height: fit-content;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > button {
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }

  ${(props) => props.theme.mq.mobile} {
    right: 1rem;
    bottom: 1rem;
  }
`;

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const [campusId, setCampusId] = useRecoilState(campusState);
  const [keyword, setKeyword] = useState("");
  const auth = useRecoilValue(authState);

  const toggleActive = (key: number) => {
    setCampusId(key);
  };

  const navigate = useNavigate();
  const moveToCreate = () => {
    if (auth.accessToken) navigate("/mobilecreate");
    else setLoginModalOpen(true);
  };

  const [togetherMapData, userRankingListData, placeRankingListData] =
    useQueries([
      {
        queryKey: [`${campusId} - togetherMapList`],
        queryFn: () => getTogetherMapList(Number(campusId)),
      },
      {
        queryKey: [`${campusId} - userRankingList`],
        queryFn: () => getUserRanking(Number(campusId)),
      },
      {
        queryKey: [`${campusId} - placeRankingList`],
        queryFn: () => getPlaceRanking(Number(campusId)),
      },
    ]);

  const handleModal = () => {
    if (auth.accessToken) setModalOpen(true);
    else setLoginModalOpen(true);
  };

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const moveToSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?keyword=${keyword}`);
  };

  return (
    <>
      <Helmet>
        <title>SSAPIN</title>
      </Helmet>
      <HeadContainer>
        <Header func={toggleActive} />
        <QuestionContainer>
          <HeaderSwiper data={togetherMapData} />
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
        <UserRanking
          users={
            userRankingListData.isSuccess &&
            userRankingListData.data?.userRankingList
          }
        />

        <PlaceRanking places={placeRankingListData.data} />
        <IntersectContainer>
          <MapRanking />
        </IntersectContainer>
        <IntersectContainer>
          <MapList />
        </IntersectContainer>
        <TogetherMapList togetherData={togetherMapData.data} />
        <FixContainer>
          <MoveToTopButton />
          <LessPC>
            <MobileCampusButton />
          </LessPC>
          <CreateButton type="button" text="지도 만들기" func={handleModal} />
          <CreateButtonMobile type="button" func={moveToCreate} />
          {modalOpen && (
            <ModalPortal>
              <CreateMapModal onClose={() => setModalOpen(false)} />
            </ModalPortal>
          )}
        </FixContainer>
      </MainContainer>

      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
      <Footer nav={false} />
    </>
  );
}

export default MainPage;
