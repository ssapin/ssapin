import styled from "@emotion/styled";
import React, { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MenuButton from "../../components/Buttons/MenuButton";
import Logo from "../../assets/image/ssapin_logo.png";
import Kakaotalk from "../../assets/image/ri_kakao-talk-fill.png";
import CampusButton from "../../components/Buttons/CampusButton";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { authState, campusState, userInformationState } from "../../store/atom";
import { ReactComponent as Xbutton } from "../../assets/svgs/xbutton.svg";
import { ReactComponent as Logout } from "../../assets/svgs/logoutbutton.svg";
import Footer from "../../components/etc/Footer";
import useUserActions from "../../utils/hooks/useUserActions";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import LoginModal from "../Login/LoginModal";

const Container = styled.div<{ innerWidth: number }>`
  background-color: ${(props) => props.theme.colors.mainBlue};
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 1rem 0rem 1rem;
  ${(props) => props.theme.mq.tablet} {
    padding: 1rem 0.5rem 0.5rem 1.5rem;
  }
  padding: ${(props) =>
    props.innerWidth >= 950
      ? `1rem 0.5rem 0.5rem 1.5rem`
      : `1rem 1rem 0rem 1rem`};
`;

const CampusContainer = styled.div<{ innerWidth: number }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) => props.innerWidth < 950 && `71%`};
  justify-content: flex-start;
`;

const EmptyContainer = styled.div`
  width: 14.5%;
  height: 100%;
`;

const LogoContainer = styled.h1<{ innerWidth: number }>`
  width: 100%;
  height: ${(props) => (props.innerWidth >= 950 ? `50%` : `80%`)};
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: ${(props) => props.innerWidth < 950 && `center`};
  margin-bottom: ${(props) => props.innerWidth >= 950 && `0.7rem`};
  text-align: ${(props) => props.innerWidth < 950 && `center`};
  align-items: ${(props) => props.innerWidth < 950 && `center`};

  .logo {
    height: ${(props) => (props.innerWidth >= 950 ? `100%` : `40%`)};
    margin: 0;
    img {
      width: auto;
      height: 100%;
    }
  }

  button {
    height: 35%;
    margin-top: ${(props) => props.innerWidth >= 950 && `2.3rem`};
    margin-left: ${(props) => props.innerWidth >= 950 && `0.5rem`};
    background-color: transparent;
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.subYellow};

    &:hover {
      scale: 1.05;
      cursor: pointer;
    }
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

const MyInfo = styled.div`
  div {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.mainNavy};
  }
`;
const NavContentFirst = styled.div`
  div {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: black;
  }
`;

const NavContentSecond = styled.div`
  div {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
    color: black;
  }
`;

const MenuContainer = styled.div<{ innerWidth: number }>`
  width: ${(props) => props.innerWidth < 950 && `14.5%`};
  height: 100%;
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

    position: fixed;
    top: 0;
    right: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    right: 0;
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

type NavBarProps = {
  // eslint-disable-next-line react/require-default-props
  func?: (key: number) => void;
};

function NavigationBar({ func }: NavBarProps) {
  const [campusId] = useRecoilState(campusState);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const auth = useRecoilValue(authState);
  const useUserAction = useUserActions();

  const toggleSide = () => {
    setIsOpen(!isOpen);
  };
  const userInformation = useRecoilValue(userInformationState);

  const campus = CAMPUS_LIST;

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("");
  };

  return (
    <>
      <Container innerWidth={innerWidth}>
        {innerWidth < 950 && <EmptyContainer />}
        <CampusContainer innerWidth={innerWidth}>
          <LogoContainer innerWidth={innerWidth}>
            <button type="button" onClick={moveToHome} className="logo">
              <img alt="ssapin_logo.png" src={Logo} />
            </button>
            <button type="button" onClick={toggleSide}>
              {campus[campusId]} ▼
            </button>
          </LogoContainer>
          {isOpen && (
            <CampusButton open={toggleSide} select={func} campusId={campusId} />
          )}
        </CampusContainer>
        <MenuContainer innerWidth={innerWidth}>
          <MenuButton func={showSidebar} />
        </MenuContainer>
      </Container>
      <Side>
        <div className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="nav-content">
            <div className="buttons">
              {auth.accessToken && (
                <button
                  type="button"
                  aria-label="logout"
                  onClick={useUserAction.logout}
                >
                  <Logout />
                </button>
              )}
              <button
                type="button"
                onClick={showSidebar}
                aria-label="close button"
              >
                <Xbutton />
              </button>
            </div>
            {auth.accessToken ? (
              <MyInfo>
                <div className="nav-text">
                  {userInformation.emoji} {userInformation.nickname}
                </div>
              </MyInfo>
            ) : (
              <button type="button" onClick={handleModal}>
                까까오똑 로꾸인
              </button>
            )}

            {modalOpen && (
              <ModalPortal>
                <LoginModal onClose={() => setModalOpen(false)} />
              </ModalPortal>
            )}
            <hr />
            <NavContentFirst>
              <div className="nav-text">🏠 홈</div>
              <div className="nav-text">🗺 지도 찾기</div>
              <div className="nav-text">💡 마이페이지</div>
            </NavContentFirst>
            <hr />
            <NavContentSecond>
              <div className="nav-text">
                <img alt="ri_kakao-talk-fill.png" src={Kakaotalk} />
                &nbsp;카카오톡 채널
              </div>
              <div className="nav-text">🗣 건의사항</div>
            </NavContentSecond>
          </div>

          <Footer />
        </div>
      </Side>
      {sidebar && <Page onClick={showSidebar} />}
    </>
  );
}

const NavBar = memo(NavigationBar);
export default NavBar;
