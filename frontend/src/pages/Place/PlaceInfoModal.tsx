import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import ModalContainer from "../../components/containers/ModalContainer";
import testMap from "../../assets/image/testmapPic.png";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import MapTitleCard from "../../components/card/MapTitleCard";
import UserOpinionCard from "../../components/card/UserOpinionCard";
import { authState, userInformationState } from "../../store/atom";
import { ReactComponent as Xbutton } from "../../assets/svgs/xbutton.svg";

interface PlaceInfoModalProps {
  onClose: () => void;
}

const Container = styled.div`
  width: 50vw;
  max-width: 925px;
  height: 80vh;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 15%;
  width: 100%;

  .xbutton {
    height: fit-content;
  }
`;
const PlaceInfoContainer = styled.div`
  text-align: center;
  p {
    margin-top: 0.5rem;
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.gray500};
  }
`;
const PlaceTitle = styled.h1`
  font-family: ${(props) => props.theme.fontFamily.h1bold};
  font-size: ${(props) => props.theme.fontSizes.h1};
`;

const PlaceContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
  height: 85%;
  width: 100%;
  overflow: hidden;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 45%;
  ${(props) => props.theme.mq.tablet} {
    width: 100%;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 45%;
  ${(props) => props.theme.mq.tablet} {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    width: auto;
    height: 70%;
  }
`;

const ReviewWriteContainer = styled.div`
  width: 100%;
  height: 45%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 45%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 30%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Comment = styled.input`
  width: 100%;
  height: 50%;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};
`;

const ButtonContainer = styled.div`
  height: 30%;
  button {
    width: 100%;
    height: 100%;
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const KakaoMapButton = styled.button`
  width: 100%;
  height: 16%;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  color: white;
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

const WriteContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 15%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  button {
    margin-right: 1rem;
  }
`;

const Subtitle = styled.h4`
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  color: ${(props) => props.theme.colors.gray600};
  width: 100%;
`;

function PlaceInfoModal({ onClose }: PlaceInfoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [ratePlace, setRatePlace] = useState(0);
  const userInformation = useRecoilValue(userInformationState);
  const auth = useRecoilValue(authState);
  const toggleActive = (key: number) => {
    setRatePlace(key);
    setIsOpen(!isOpen);
  };

  const addBookmark = () => {
    setBookmark(!bookmark);
  };
  useEffect(() => {
    if (isOpen === false) setRatePlace(0);
  }, [isOpen]);

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <HeadContainer>
          <MapCircleButton
            type="button"
            shape={`${bookmark ? 2 : 3}`}
            func={addBookmark}
          />
          <PlaceInfoContainer>
            <PlaceTitle>설이 마음속</PlaceTitle>
            <p>사랑시 고백구 행복동</p>
          </PlaceInfoContainer>
          <button type="button" className="xbutton">
            <Xbutton />
          </button>
        </HeadContainer>

        <PlaceContent>
          <LeftContainer>
            <PlaceContainer>
              <Subtitle>어떤 곳인가요?</Subtitle>
              <MapTitleCard user="dd" used="modal" title="efaf" />
              <MapTitleCard user="dafd" used="modal" title="efwf" />
            </PlaceContainer>
            <ShareContainer>
              <Subtitle>이 장소 공유하기</Subtitle>
              <Buttons>
                <MapCircleButton type="button" height="50px" shape="1" />
                <MapCircleButton type="button" height="50px" shape="0" />
              </Buttons>
            </ShareContainer>
            <ImageContainer>
              <img alt="testmap.png" src={testMap} />
              <KakaoMapButton>카카오맵리뷰보기</KakaoMapButton>
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <ReviewContainer>
              <Subtitle>싸핀러들의 생각은 어떤가요?</Subtitle>
              <UserOpinionCard emoji={1} content="dasdf" isAdmin />
              <UserOpinionCard emoji={2} content="쿠쿠루삥뽕" isAdmin={false} />
            </ReviewContainer>
            <ReviewWriteContainer>
              {auth.accessToken ? (
                <Subtitle>
                  {userInformation.nickname}님의 의견 남겨주세요!
                </Subtitle>
              ) : (
                <Subtitle>로그인을 하여 리뷰를 남겨보세요!</Subtitle>
              )}
              <PlaceRatingButton ratePlace={ratePlace} func={toggleActive} />
              <WriteContainer>
                {isOpen && (
                  <>
                    <Comment placeholder="의견을 입력해봐라" />
                    <ButtonContainer>
                      <ConfirmButton type="submit" text="작성" />
                    </ButtonContainer>
                  </>
                )}
              </WriteContainer>
            </ReviewWriteContainer>
          </RightContainer>
        </PlaceContent>
      </Container>
    </ModalContainer>
  );
}

export default PlaceInfoModal;
