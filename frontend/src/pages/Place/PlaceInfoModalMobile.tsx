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
  width: 100%;
  max-width: 925px;
  height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.3rem;

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
  align-items: center;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    width: 100%;
    height: auto;
  }
`;

const ReviewWriteContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    margin-bottom: 1rem;
  }
`;

const ReviewContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PlaceContainer = styled.div`
  width: 100%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Comment = styled.input`
  width: 100%;
  border-radius: 10px;
  height: 50%;
  border: 2px solid ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding: 1rem;
`;

const ButtonContainer = styled.div`
  height: 40%;
  text-align: center;
  button {
    width: 30%;
    height: 100%;
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
    padding: 1rem;
  }
`;

const WriteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShareContainer = styled.div``;

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
  margin: 1rem;
  text-align: center;
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
            height="50px"
          />
          <PlaceInfoContainer>
            <PlaceTitle>설이 마음속</PlaceTitle>
            <p>사랑시 고백구 행복동</p>
          </PlaceInfoContainer>
          <button type="button" className="xbutton" onClick={onClose}>
            <Xbutton />
          </button>
        </HeadContainer>

        <PlaceContent>
          <ImageContainer>
            <img alt="testmap.png" src={testMap} />
          </ImageContainer>
          <Subtitle>어떤 곳인가요?</Subtitle>
          <PlaceContainer>
            <MapTitleCard user="dd" used="modal" title="efaf" />
            <MapTitleCard user="dafd" used="modal" title="efwf" />
          </PlaceContainer>
          <Subtitle>싸핀러들의 생각</Subtitle>
          <ReviewContainer>
            <UserOpinionCard emoji={1} content="dasdf" isAdmin />
            <UserOpinionCard emoji={2} content="쿠쿠루삥뽕" isAdmin={false} />
          </ReviewContainer>
          <Subtitle>장소 공유하기</Subtitle>
          <ShareContainer>
            <Buttons>
              <MapCircleButton type="button" height="50px" shape="1" />
              <MapCircleButton type="button" height="50px" shape="0" />
            </Buttons>
          </ShareContainer>
          {auth.accessToken ? (
            <Subtitle>{userInformation.nickname}님의 의견 남겨주세요!</Subtitle>
          ) : (
            <Subtitle>로그인을 하여 리뷰를 남겨보세요!</Subtitle>
          )}
          <ReviewWriteContainer>
            <PlaceRatingButton ratePlace={ratePlace} func={toggleActive} />
            <WriteContainer>
              {isOpen && (
                <>
                  <Comment placeholder="모바일용이에요" />
                  <ButtonContainer>
                    <ConfirmButton type="submit" text="작성" />
                  </ButtonContainer>
                </>
              )}
            </WriteContainer>
          </ReviewWriteContainer>
        </PlaceContent>
      </Container>
    </ModalContainer>
  );
}

export default PlaceInfoModal;
