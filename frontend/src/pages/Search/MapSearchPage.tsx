import styled from "@emotion/styled";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import Footer from "../../components/etc/Footer";
import MapSearch from "../../components/etc/MapSearch";
import { campusState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import Navbar from "../Navbar/Navbar";
import YellowButton from "../../components/Buttons/YellowButton";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import CreateMapModal from "../CreateMap/CreateMapModal";
import FilterModal from "./FilteringModal";
import AddPlaceModal from "./AddPlaceModal";
import SearchList from "./SearchList";

const HeadContainer = styled.div`
  width: 100%;
  height: 50vh;
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
    height: 50px;
    min-width: 100px;
  }
  p {
    height: 20%;
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h1};
    font-size: ${(props) => props.theme.fontSizes.h1};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h2};
      font-size: ${(props) => props.theme.fontSizes.h2};
    }
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
  z-index: 2;

  button {
    margin-bottom: 1rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

const Side = styled.div`
  hr {
    width: 100%;
  }
  z-index: 999;

  .nav-menu {
    background-color: white;
    width: 30vw;
    height: 100vh;
    padding: 1rem;
    min-width: 500px;

    ${(props) => props.theme.mq.tablet} {
      width: 70vw;
      min-width: 300px;
    }

    ${(props) => props.theme.mq.mobile} {
      width: 90vw;
      min-width: 300px;
    }

    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
    display: flex;
    flex-direction: column;
  }
`;

const Page = styled.div`
  position: fixed;
  width: 100%;
  height: 130vh;
  background-color: black;
  opacity: 0.5;
  z-index: 3;
`;

function SearchPage() {
  const [campusId, setCampusId] = useRecoilState(campusState);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [placemodalOpen, setPlaceModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [hashTag, setHashTag] = useState([]);
  const [keyword, setKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [fakeKeyword, setFakeKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const onChangeTag = (checked: any, item: any) => {
    if (checked) {
      setHashTag([...hashTag, item]);
    } else if (!checked) {
      setHashTag(hashTag.filter((el: any) => el !== item));
    }
  };

  const onResetTag = () => {
    setHashTag([]);
    setFakeKeyword("");
    setKeyword("");
    setSidebar(!sidebar);
  };

  const toggleActive = (key: number) => {
    setCampusId(key);
  };

  const handleCreateModal = () => {
    setCreateModalOpen(true);
  };

  const onChangeKeyword = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setFakeKeyword(e.target.value);
  };

  const onClickKeyword = () => {
    setKeyword(fakeKeyword);
  };

  const onSearch = () => {
    setKeyword(fakeKeyword);
    setSidebar(!sidebar);
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const navigate = useNavigate();
  const moveToCreate = () => {
    navigate("/mobileCreate");
  };

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <Searchbar>
          <p>🔍 추천 지도 검색 🔍</p>
          <MapSearch
            width="50%"
            height="15%"
            changeFunc={onChangeKeyword}
            clickFunc={onClickKeyword}
            value={fakeKeyword}
          />
          <YellowButton type="button" text="필터링" func={showSidebar} />
          <Side>
            <div className={sidebar ? "nav-menu active" : "nav-menu"}>
              <FilterModal
                hashTag={hashTag}
                onChangeKeyword={onChangeKeyword}
                onChangeTag={onChangeTag}
                onReset={onResetTag}
                onSearch={onSearch}
                keyword={fakeKeyword}
              />
            </div>
          </Side>
          {sidebar && <Page onClick={showSidebar} />}
        </Searchbar>
        {placemodalOpen && (
          <ModalPortal>
            <AddPlaceModal onClose={() => setPlaceModalOpen(false)} />
          </ModalPortal>
        )}
      </HeadContainer>
      <MainContainer>
        <SearchList hashtag={hashTag} keyword={keyword} />
      </MainContainer>
      <FixContainer>
        <MoveToTopButton />
        {innerWidth > 650 ? (
          <CreateButton
            type="button"
            text="지도 만들기"
            func={handleCreateModal}
          />
        ) : (
          <CreateButtonMobile type="button" func={moveToCreate} />
        )}
        {createModalOpen && (
          <ModalPortal>
            <CreateMapModal onClose={() => setCreateModalOpen(false)} />
          </ModalPortal>
        )}
      </FixContainer>
      <Footer />
    </>
  );
}
export default SearchPage;
