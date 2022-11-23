import styled from "@emotion/styled";
import { ChangeEvent, FormEvent, lazy, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MapSearch from "../../components/etc/MapSearch";
import { authState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import YellowButton from "../../components/Buttons/YellowButton";
import FilterModal from "./FilteringModal";
import SearchList from "./SearchList";
import LoginModal from "../Login/LoginModal";
import { LessPC } from "../../components/containers/MediaQueryContainer";
import MobileCampusButton from "../../components/Buttons/MobileCampusButton";

const CreateMapModal = lazy(() => import("../CreateMap/CreateMapModal"));
const ModalPortal = lazy(
  () => import("../../components/containers/ModalPortalContainer"),
);
const MoveToTopButton = lazy(
  () => import("../../components/Buttons/MoveToTopButton"),
);
const CreateButton = lazy(
  () => import("../../components/Buttons/CreateButton"),
);

const CreateButtonMobile = lazy(
  () => import("../../components/Buttons/CreateButtonMobile"),
);

const HeadContainer = styled.header`
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
  max-width: 1400px;
  margin: 0 auto;
  > button {
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

const MainContainer = styled.main`
  width: 100%;
  height: fit-content;
  max-width: 1024px;
  margin: 0 auto;
  padding: 1rem;
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > button {
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
  height: 150vh;
  background-color: black;
  opacity: 0.5;
  z-index: 3;
`;

function SearchPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [hashTag, setHashTag] = useState([]);
  const [keyword, setKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [fakeKeyword, setFakeKeyword] = useState(
    new URLSearchParams(window.location.search).get("keyword") || "",
  );
  const [sidebar, setSidebar] = useState(false);
  const auth = useRecoilValue(authState);
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);

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

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setFakeKeyword(e.target.value);
  };

  const onClickKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    if (auth.accessToken) navigate("/mobilecreate");
    else setLoginModalOpen(true);
  };
  const handleCreateModal = () => {
    if (auth.accessToken) setCreateModalOpen(true);
    else setLoginModalOpen(true);
  };

  return (
    <>
      <HeadContainer>
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
      </HeadContainer>
      <MainContainer>
        <SearchList hashtag={hashTag} keyword={keyword} />
        <FixContainer>
          <MoveToTopButton />
          <LessPC>
            <MobileCampusButton />
          </LessPC>
          <CreateButton
            type="button"
            text="지도 만들기"
            func={handleCreateModal}
          />
          <CreateButtonMobile type="button" func={moveToCreate} />
        </FixContainer>
      </MainContainer>

      {createModalOpen && (
        <ModalPortal>
          <CreateMapModal onClose={() => setCreateModalOpen(false)} />
        </ModalPortal>
      )}
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
    </>
  );
}
export default SearchPage;
