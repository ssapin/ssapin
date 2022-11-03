import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import Footer from "../../components/etc/Footer";
import MapSearch from "../../components/etc/MapSearch";
import { campusState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import Navbar from "../Navbar/Navbar";
import YellowButton from "../../components/Buttons/YellowButton";
// import MapList from "../Main/MapList";
// import { mapApis } from "../../utils/apis/mapApi";
import SearchList from "./SearchList";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import LoginModal from "../Login/LoginModal";
import FilterModal from "./FilteringModal";

const HeadContainer = styled.div`
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Searchbar = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  button {
    margin-top: 1.5rem;
    width: 8%;
  }
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
function SearchPage() {
  //   const [maps, setMaps] = useState<IMap[]>([]);

  const [campusId, setCampusId] = useRecoilState(campusState);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const toggleActive = (key: number) => {
    setCampusId(key);
  };
  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <Searchbar>
          <MapSearch width="50%" height="15%" />
          <YellowButton type="button" text="필터링" func={handleModal} />
          {modalOpen && (
            <ModalPortal>
              <FilterModal onClose={() => setModalOpen(false)} />
            </ModalPortal>
          )}
        </Searchbar>
      </HeadContainer>
      <MainContainer>
        <SearchList />
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
export default SearchPage;
