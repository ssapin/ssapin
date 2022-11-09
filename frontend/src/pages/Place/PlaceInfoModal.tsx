import styled from "@emotion/styled";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import ModalContainer from "../../components/containers/ModalContainer";
// import testMap from "../../assets/image/testmapPic.png";
import MapCircleButton from "../../components/Buttons/MapCircleButton";
import MapTitleCard from "../../components/card/MapTitleCard";
import UserOpinionCard from "../../components/card/UserOpinionCard";
import { authState, userInformationState } from "../../store/atom";
import { ReactComponent as Xbutton } from "../../assets/svgs/xbutton.svg";
import { IPlaceDetail } from "../../utils/types/place.interface";
import PLACE_APIS from "../../utils/apis/placeApi";
import axiosInstance from "../../utils/apis/api";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import LoginModal from "../Login/LoginModal";
import { IReview } from "../../utils/types/review.interface";
import REVIEW_APIS from "../../utils/apis/reviewApi";
import { IMap } from "../../utils/types/map.interface";
import {
  addBookmarkInPlace,
  removeBookmarkInPlace,
} from "../../utils/functions/place";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

interface PlaceInfoModalProps {
  placeId: number;
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
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 45%;
`;

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewWriteContainer = styled.div`
  width: 100%;
  height: 50%;
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
  height: 27%;
  button {
    width: 100%;
    height: 100%;
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const KakaoMapButton = styled.button`
  width: 100%;
  height: 18%;
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

const ReviewList = styled.div`
  overflow: scroll;
`;

const MapContainer = styled.div`
  width: auto;
  height: 70%;
  border-radius: 15px;
`;

function PlaceInfoModal({ placeId, onClose }: PlaceInfoModalProps) {
  const [place, setPlace] = useState<IPlaceDetail>();
  const [isOpen, setIsOpen] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [ratePlace, setRatePlace] = useState(0);
  const userInformation = useRecoilValue(userInformationState);
  const auth = useRecoilValue(authState);
  const [LoginmodalOpen, setLoginModalOpen] = useState(false);
  const [reviewList, setReviewList] = useState<IReview[]>([]);
  const [mapList, setMapList] = useState<IMap[]>([]);
  const [reviewContent, setReviewContent] = useState("");
  const mapRef = useRef<HTMLDivElement>();

  const { data: reviewData, refetch: reviewRefetch } = useQuery<
    AxiosResponse<any>,
    AxiosError
  >(
    [`${placeId} - reviewList`],
    () => axiosInstance.get(REVIEW_APIS.getReviewList(placeId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: placeDetailData } = useQuery<AxiosResponse<any>, AxiosError>(
    [`${placeId} - placeDetail`],
    () => axiosInstance.get(PLACE_APIS.getDetailPlaceInfo(placeId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const { data: mapData } = useQuery<AxiosResponse<any>, AxiosError>(
    [`${placeId} - MapList`],
    () => axiosInstance.get(PLACE_APIS.getMapListInPlace(placeId)),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
    },
  );

  const onChangeReview = (e: { target: { value: SetStateAction<string> } }) => {
    setReviewContent(e.target.value);
  };

  const toggleActive = (key: number) => {
    setRatePlace(key);
    setIsOpen(!isOpen);
  };

  const onWriteReview = async () => {
    if (!auth.accessToken) {
      setLoginModalOpen(true);
      setRatePlace(0);
      setReviewContent("");
      setIsOpen(false);
      return;
    }

    if (reviewContent.length === 0) {
      // eslint-disable-next-line no-alert
      alert("리뷰를 작성해주세요!");
      return;
    }

    if (ratePlace === 0) {
      // eslint-disable-next-line no-alert
      alert("리뷰 이모지를 클릭해주세요!");
      return;
    }

    if (reviewContent.length > 50) {
      // eslint-disable-next-line no-alert
      alert("리뷰는 20자 이내로 작성해주세요!");
      return;
    }

    const body = JSON.stringify({
      content: reviewContent,
      emojiType: ratePlace,
      placeId,
    });

    const response = await axiosInstance.post(REVIEW_APIS.REVIEW, body);

    try {
      if (response.status === 200) {
        reviewRefetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteReview = async (reviewId: number) => {
    if (!auth.accessToken) {
      setLoginModalOpen(true);
      return;
    }

    const response = await axiosInstance.delete(REVIEW_APIS.REVIEW, {
      data: { reviewId },
    });

    try {
      if (response.status === 204) {
        reviewRefetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBookmark = async () => {
    if (auth.accessToken) {
      if (bookmark) {
        addBookmarkInPlace({ placeId });
      } else if (!bookmark) {
        removeBookmarkInPlace({ placeId });
      }
      setBookmark(!bookmark);
    } else {
      setLoginModalOpen(true);
    }
  };

  useEffect(() => {
    if (placeDetailData?.data) {
      setPlace(placeDetailData.data);
      setBookmark(placeDetailData.data.isBookMark);

      const markerPosition = new kakao.maps.LatLng(
        placeDetailData.data.lng,
        placeDetailData.data.lat,
      );

      const marker = {
        position: markerPosition,
      };
      const staticMapContainer = mapRef.current;
      const staticMapOption = {
        center: new kakao.maps.LatLng(
          placeDetailData.data.lng,
          placeDetailData.data.lat,
        ),
        level: 3,
        marker,
      };

      const staticMap = new kakao.maps.StaticMap(
        staticMapContainer,
        staticMapOption,
      );
    }

    if (reviewData?.data) {
      setReviewList(reviewData.data);
    }

    if (mapData?.data) {
      setMapList(mapData.data.mapList);
    }
  }, [placeDetailData, reviewData, mapData]);

  useEffect(() => {
    if (isOpen === false) {
      setRatePlace(0);
      setReviewContent("");
    }
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
            <PlaceTitle>{place?.title}</PlaceTitle>
            <p>{place?.address}</p>
          </PlaceInfoContainer>
          <button type="button" className="xbutton" onClick={onClose}>
            <Xbutton />
          </button>
        </HeadContainer>

        <PlaceContent>
          <LeftContainer>
            <PlaceContainer>
              <Subtitle>어떤 곳인가요?</Subtitle>
              <ReviewList>
                {mapList?.length !== 0 &&
                  mapList.map((map, id) => (
                    <MapTitleCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={id}
                      user={`${map.userEmoji} ${map.nickname}`}
                      used="modal"
                      title={map.title}
                    />
                  ))}

                {!mapList ||
                  (mapList.length === 0 && (
                    <MapTitleCard
                      user=""
                      used="modal"
                      title="등록된 map이 없습니다."
                    />
                  ))}
              </ReviewList>
            </PlaceContainer>
            <ShareContainer>
              <Subtitle>이 장소 공유하기</Subtitle>
              <Buttons>
                <MapCircleButton type="button" height="50px" shape="1" />
                <MapCircleButton type="button" height="50px" shape="0" />
              </Buttons>
            </ShareContainer>
            <ImageContainer>
              <MapContainer ref={mapRef} />
              <KakaoMapButton
                onClick={() => {
                  window.open(`https://place.map.kakao.com/${place.itemId}`);
                }}
              >
                카카오맵리뷰보기
              </KakaoMapButton>
            </ImageContainer>
          </LeftContainer>
          <RightContainer>
            <ReviewContainer>
              <Subtitle>싸핀러들의 생각은 어떤가요?</Subtitle>
              <ReviewList>
                {reviewList.map((review, id) => (
                  <UserOpinionCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    review={review}
                    func={onDeleteReview}
                  />
                ))}
                {!reviewList ||
                  (reviewList.length === 0 && (
                    <UserOpinionCard review={null} />
                  ))}
              </ReviewList>
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
                    <Comment
                      placeholder=" 장소에 대한 의견을 작성해주세요."
                      onChange={onChangeReview}
                      value={reviewContent}
                    />
                    <ButtonContainer>
                      <ConfirmButton
                        type="button"
                        text="작성"
                        func={onWriteReview}
                      />
                    </ButtonContainer>
                  </>
                )}
              </WriteContainer>
            </ReviewWriteContainer>
          </RightContainer>
        </PlaceContent>
      </Container>
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
    </ModalContainer>
  );
}

export default PlaceInfoModal;
