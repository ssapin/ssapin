import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pixelToRem } from "../../utils/functions/util";
import Header from "../../components/etc/Header";
import UserInfoCard from "../../components/card/UserInfoCard";
import UserInfoDetailCard from "../../components/card/UserInfoDetailCard";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import { authState, campusState, userInformationState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { ChangeInfoModal } from "./ChangeMyInfo";
import MyPageTab from "./MyPageTab";
import Footer from "../../components/etc/Footer";
import CreateMapModal from "../CreateMap/CreateMapModal";
import LoginModal from "../Login/LoginModal";
import { LessPC, PC } from "../../components/containers/MediaQueryContainer";

const PageTopBg = styled.header`
  width: 100%;
  height: 50vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.gray0};

  ${(props) => props.theme.mq.tablet} {
    height: 60vh;
  }
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  button {
    margin: 0.5rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

function MyPage() {
  const userInformation = useRecoilValue(userInformationState);
  const campus = CAMPUS_LIST;
  const setCampusId = useSetRecoilState(campusState);
  const auth = useRecoilValue(authState);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (auth.firstLogin) {
      setModalOpen(true);
    }
  }, []);

  const handleModal = () => {
    setModalOpen(true);
  };

  const toggleActive = (key: number) => {
    setCampusId(key);
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
      <Helmet>
        <title>마이페이지 - SSAPIN</title>
      </Helmet>
      <PageTopBg>
        <Header func={toggleActive} />
        <UserInfos>
          <PC>
            <UserInfoCard
              type="pc"
              emoji={userInformation.emoji}
              nickname={userInformation.nickname}
              campus={campus[userInformation.campusId]}
              func={handleModal}
            />
          </PC>
          <LessPC>
            <UserInfoCard
              type="mobile"
              emoji={userInformation.emoji}
              nickname={userInformation.nickname}
              campus={campus[userInformation.campusId]}
              func={handleModal}
            />
          </LessPC>
          {modalOpen && (
            <ModalPortal>
              <ChangeInfoModal onClose={() => setModalOpen(false)} />
            </ModalPortal>
          )}
          <PC>
            <UserInfoDetailCard
              type="pc"
              nickname={userInformation.nickname}
              mapcnt={userInformation.mapCnt}
              placecnt={userInformation.placeCnt}
              participatecnt={userInformation.participateCnt}
            />
          </PC>
          <LessPC>
            <UserInfoDetailCard
              type="mobile"
              nickname={userInformation.nickname}
              mapcnt={userInformation.mapCnt}
              placecnt={userInformation.placeCnt}
              participatecnt={userInformation.participateCnt}
            />
          </LessPC>
        </UserInfos>
      </PageTopBg>
      <MyPageTab />
      <FixContainer>
        <MoveToTopButton />
        <CreateButton
          type="button"
          text="지도 만들기"
          func={handleCreateModal}
        />
        <CreateButtonMobile type="button" func={moveToCreate} />
        {createModalOpen && (
          <ModalPortal>
            <CreateMapModal onClose={() => setCreateModalOpen(false)} />
          </ModalPortal>
        )}
      </FixContainer>
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
      <Footer nav={false} />
    </>
  );
}

export default MyPage;
