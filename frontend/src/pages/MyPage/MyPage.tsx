import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { pixelToRem } from "../../utils/functions/util";
import UserInfoCard from "../../components/card/UserInfoCard";
import UserInfoDetailCard from "../../components/card/UserInfoDetailCard";
import MoveToTopButton from "../../components/Buttons/MoveToTopButton";
import CreateButton from "../../components/Buttons/CreateButton";
import CreateButtonMobile from "../../components/Buttons/CreateButtonMobile";
import { authState, userInformationState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { ChangeInfoModal } from "./ChangeMyInfo";
import MyPageTab from "./MyPageTab";
import CreateMapModal from "../CreateMap/CreateMapModal";
import LoginModal from "../Login/LoginModal";

const PageTopBg = styled.header`
  width: 100%;
  height: fit-content;
  padding-bottom: 2rem;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.gray0};
  position: relative;
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1024px;
  gap: 1rem;
  margin: 0 auto;
  padding: 0 1rem;
  height: 200px;

  ${(props) => props.theme.mq.mobile} {
    flex-direction: column;
    height: fit-content;
  }
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1;
  max-width: 1024px;
  margin: 0 auto;
  button {
    margin: 0.5rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }
`;

function MyPage() {
  const userInformation = useRecoilValue(userInformationState);
  const campus = CAMPUS_LIST;
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
        <UserInfos>
          <UserInfoCard
            emoji={userInformation.emoji}
            nickname={userInformation.nickname}
            campus={campus[userInformation.campusId]}
            func={handleModal}
          />
          {modalOpen && (
            <ModalPortal>
              <ChangeInfoModal onClose={() => setModalOpen(false)} />
            </ModalPortal>
          )}
          <UserInfoDetailCard
            nickname={userInformation.nickname}
            mapcnt={userInformation.mapCnt}
            placecnt={userInformation.placeCnt}
            participatecnt={userInformation.participateCnt}
          />
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
    </>
  );
}

export default MyPage;
