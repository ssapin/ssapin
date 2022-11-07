import styled from "@emotion/styled";
import { SetStateAction, useEffect, useState } from "react";
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
import SearchList from "./SearchList";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import CreateMapModal from "../CreateMap/CreateMapModal";
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
  p {
    height: 20%;
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h1};
    font-size: ${(props) => props.theme.fontSizes.h1};
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
    width: 27vw;
    height: 100vh;

    ${(props) => props.theme.mq.tablet} {
      width: 70vw;
    }

    ${(props) => props.theme.mq.mobile} {
      width: 90vw;
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

  .nav-content {
    padding: 2rem;
    height: 70%;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
    button {
      transition: transform 0.2s ease-in;
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0 8px 16px;
    list-style: none;
    height: 60px;
  }
  .nav-text:hover {
    scale: 1.05;
    cursor: pointer;
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
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [hashTag, setHashTag] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [fakeKeyword, setFakeKeyword] = useState("");
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

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <HeadContainer>
        <Navbar func={toggleActive} />
        <Searchbar>
          <p>추천 지도 검색</p>
          <MapSearch
            width="50%"
            height="15%"
            changeFunc={onChangeKeyword}
            clickFunc={onClickKeyword}
          />
          <YellowButton type="button" text="필터링" func={showSidebar} />
          <Side>
            <div className={sidebar ? "nav-menu active" : "nav-menu"}>
              <FilterModal
                hashTag={hashTag}
                onClose={showSidebar}
                onChangeTag={onChangeTag}
                onReset={onResetTag}
              />
            </div>
          </Side>
          {sidebar && <Page onClick={showSidebar} />}
        </Searchbar>
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
          <CreateButtonMobile type="button" />
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
