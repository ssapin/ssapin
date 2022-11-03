import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import { useRecoilValue } from "recoil";
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
import ModalPortal from "../../components/containers/ModalPortalContainer";
import LoginModal from "../Login/LoginModal";
import useUserActions, {
  useGetUserInformation,
} from "../../utils/hooks/useUserActions";
import { authState } from "../../store/atom";

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

  const handleModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const questions = [
    {
      emoji: "⏰📝📚🤓💻",
      place: 129,
      mapId: 1,
      description: "싸피 교육이 끝나고 어디서 공부하시나요?",
    },
    {
      emoji: "🍜🥂🍴🍲🥘",
      place: 129,
      mapId: 1,
      description: "이 곳은 찐이다.. 내가 뽑은 캠퍼스 근처 최고 맛집은?",
    },
    {
      emoji: "💸😞🌯🍙🥙",
      place: 129,
      mapId: 1,
      description: "히잉.. 꼬르륵.. 돈이없을 때 먹는 갓성비 식당은?",
    },
    {
      emoji: "🍦🧁🍷☕🍸",
      place: 129,
      mapId: 1,
      description: "싸피의 Refresh Time! 점심시간에 가장 많이 가는 카페?",
    },
    {
      emoji: "🎬🍻🎳🎮🎤",
      place: 129,
      mapId: 1,
      description:
        "싸피 끝나고 치맥 한잔! 캠퍼스 근처 놀기 좋은 장소는 어디인가요?",
    },
    {
      emoji: "🤐🍱🍽🙋‍♂️🥟",
      place: 129,
      mapId: 1,
      description: "아주머니 단무지는 빼주세요.. 혼밥 최고 장소를 찍어주세요",
    },
  ];

  const handleLogout = () => {
    useUserAction.logout();
  };

  return (
    <>
      <HeadContainer>
        <Navbar />
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
          {/* <Carousel interval={4500} animation="fade" duration={1000}>
            {questions.map((item, i) => (
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
        <MapRanking />
        <MapList />
        <TogetherMapList />
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
