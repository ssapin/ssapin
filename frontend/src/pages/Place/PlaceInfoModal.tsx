/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "@emotion/styled";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import ModalContainer from "../../components/containers/ModalContainer";
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
import KakaoShareButton from "../../components/Buttons/KakaoShareButton";
import { copyURL } from "../../utils/functions/copyURL";
import CopyModalContainer from "../../components/containers/CopyModalContainer";

const { kakao } = window;

interface PlaceInfoModalProps {
  placeId: number;
  onClose: () => void;
}

const Container = styled.div`
  width: 800px;
  /* max-width: 925px; */
  height: 80vh;

  ${(props) => props.theme.mq.tablet} {
    width: 80vw;
    height: 70vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }
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

  ${(props) => props.theme.mq.tablet} {
    margin-bottom: 0.5rem;
    padding: 0.3rem;
    height: fit-content;
  }
`;
const PlaceInfoContainer = styled.div`
  width: 65%;
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

  ${(props) => props.theme.mq.tablet} {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
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

  ${(props) => props.theme.mq.tablet} {
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
    height: fit-content;
  }
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

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;

const ReviewWriteContainer = styled.div`
  width: 100%;
  height: 50%;
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
    button {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const ReviewContainer = styled.div`
  width: 100%;
  height: 45%;
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 30%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;

const Comment = styled.textarea`
  width: 100%;
  height: 50%;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding: 0.5rem;
  resize: none;

  ${(props) => props.theme.mq.tablet} {
    width: 85%;
    height: 60px;
    margin: auto;
  }
  ::placeholder {
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
  }
`;

const ButtonContainer = styled.div`
  height: 27%;
  button {
    width: 100%;
    height: 100%;
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }

  ${(props) => props.theme.mq.tablet} {
    height: 40%;
    text-align: center;
    margin-top: 0.3rem;
    button {
      width: 40%;
      padding: 1rem;
      font-family: ${(props) => props.theme.fontFamily.h4bold};
      font-size: ${(props) => props.theme.fontSizes.h4};
    }
  }
`;

const KakaoMapButton = styled.button`
  width: 95%;
  height: 18%;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  color: white;
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};
  margin-left: 1rem;

  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: 40px;
    margin: auto;
    margin-top: 0.3rem;
    font-family: ${(props) => props.theme.fontFamily.h5bold};
    font-size: ${(props) => props.theme.fontSizes.h5};
  }
`;

const WriteContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 15%;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  button {
    margin-right: 1rem;
  }
  margin-left: 1rem;
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.tablet} {
    margin: 0;
    button {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`;

const Subtitle = styled.h4`
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray600};
  width: 100%;
  margin-left: 1rem;

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    margin-top: 1.5rem;
    margin-left: 0;
  }
`;

const ReviewList = styled.div`
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1rem;

  ${(props) => props.theme.mq.tablet} {
    max-height: 300px;
  }
`;

const MapContainer = styled.div`
  width: auto;
  height: 70%;
  border-radius: 15px;
  margin-left: 1rem;

  ${(props) => props.theme.mq.tablet} {
    width: auto;
    height: 150px;
    margin: 0;
  }
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
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const mapRef = useRef<HTMLDivElement>();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const { data: reviewData, refetch: reviewRefetch } = useQuery<
    AxiosResponse<any>,
    AxiosError
  >([`${placeId} - reviewList`], () =>
    axiosInstance.get(REVIEW_APIS.getReviewList(placeId)),
  );

  const { data: placeDetailData } = useQuery<AxiosResponse<any>, AxiosError>(
    [`${placeId} - placeDetail`],
    () => axiosInstance.get(PLACE_APIS.getDetailPlaceInfo(placeId)),
  );

  const { data: mapData } = useQuery<AxiosResponse<any>, AxiosError>(
    [`${placeId} - MapList`],
    () => axiosInstance.get(PLACE_APIS.getMapListInPlace(placeId)),
  );

  const onChangeReview = (e: { target: { value: SetStateAction<string> } }) => {
    setReviewContent(e.target.value);
  };

  const toggleActive = (key: number) => {
    setRatePlace(key);
    setIsOpen(true);
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
      alert("리뷰는 1자 이상 적어주세요!😉");
      return;
    }

    if (ratePlace === 0) {
      // eslint-disable-next-line no-alert
      alert("리뷰를 작성하실땐 이모지를 꼭 눌러주셔야해요!😋");
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
        setRatePlace(0);
        setReviewContent("");
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
      if (!bookmark) {
        addBookmarkInPlace({ placeId });
      } else if (bookmark) {
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
      setBookmark(placeDetailData.data.bookmark);
      const mapContainer = mapRef.current;
      const markerPosition = new kakao.maps.LatLng(
        placeDetailData.data.lat,
        placeDetailData.data.lng,
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      const mapOption = {
        center: new kakao.maps.LatLng(
          placeDetailData.data.lat,
          placeDetailData.data.lng,
        ),
        level: 3,
        marker,
      };

      const map = new kakao.maps.StaticMap(mapContainer, mapOption);
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

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    if (place) {
      const mapContainer = mapRef.current;
      const markerPosition = new kakao.maps.LatLng(place.lat, place.lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      const mapOption = {
        center: new kakao.maps.LatLng(place.lat, place.lng),
        level: 3,
        marker,
      };

      const map = new kakao.maps.StaticMap(mapContainer, mapOption);
    }
  }, [innerWidth]);

  const copy = () => {
    const url = `${import.meta.env.VITE_BASE_URL}/places/${place.placeId}`;
    setCopied(true);
    copyURL(url);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onTitleClick = (mapId: number) => {
    onClose();
    navigate(`/maps/${mapId}/detail`);
  };

  return (
    <ModalContainer onClose={onClose}>
      {innerWidth > 950 ? (
        <Container>
          <HeadContainer>
            <MapCircleButton
              type="button"
              shape={`${!bookmark ? 2 : 3}`}
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
                        mapId={map.mapId}
                        func={onTitleClick}
                      />
                    ))}

                  {!mapList ||
                    (mapList.length === 0 && (
                      <MapTitleCard
                        user=""
                        used="modal"
                        title="등록된 지도가 없습니다."
                      />
                    ))}
                </ReviewList>
              </PlaceContainer>
              <ShareContainer>
                <Subtitle>이 장소 공유하기</Subtitle>
                <Buttons>
                  <MapCircleButton
                    type="button"
                    height="50px"
                    shape="1"
                    func={copy}
                  />
                  <KakaoShareButton
                    title={place?.title}
                    url={`${import.meta.env.VITE_BASE_URL}/places/${
                      place?.placeId
                    }`}
                  />
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
                        placeholder="장소에 대한 의견을 작성해주세요."
                        onChange={onChangeReview}
                        value={reviewContent}
                        maxLength={40}
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
      ) : (
        <Container>
          <HeadContainer>
            <MapCircleButton
              type="button"
              shape={`${!bookmark ? 2 : 3}`}
              func={addBookmark}
              height="50px"
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
            <Subtitle>어떤 곳인가요?</Subtitle>
            <PlaceContainer>
              <ReviewList>
                {mapList?.length !== 0 &&
                  mapList.map((map, id) => (
                    <MapTitleCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={id}
                      user={`${map.userEmoji} ${map.nickname}`}
                      used="modal"
                      title={map.title}
                      mapId={map.mapId}
                      func={onTitleClick}
                    />
                  ))}

                {!mapList ||
                  (mapList.length === 0 && (
                    <MapTitleCard
                      user=""
                      used="modal"
                      title="등록된 지도가 없습니다."
                    />
                  ))}
              </ReviewList>
            </PlaceContainer>
            <Subtitle>싸핀러들의 생각</Subtitle>
            <ReviewContainer>
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
            <Subtitle>장소 공유하기</Subtitle>
            <ShareContainer>
              <Buttons>
                <MapCircleButton
                  type="button"
                  height="50px"
                  shape="1"
                  func={copy}
                />
                <KakaoShareButton
                  title={place?.title}
                  url={`${import.meta.env.VITE_BASE_URL}/places/${
                    place?.placeId
                  }`}
                />
              </Buttons>
            </ShareContainer>
            {auth.accessToken ? (
              <Subtitle>
                {userInformation.nickname}님의 의견 남겨주세요!
              </Subtitle>
            ) : (
              <Subtitle>로그인을 하여 리뷰를 남겨보세요!</Subtitle>
            )}
            <ReviewWriteContainer>
              <PlaceRatingButton ratePlace={ratePlace} func={toggleActive} />
              <WriteContainer>
                <Comment
                  placeholder="장소에 대한 의견을 작성해주세요."
                  onChange={onChangeReview}
                  value={reviewContent}
                  maxLength={40}
                />
                <ButtonContainer>
                  <ConfirmButton
                    type="button"
                    text="작성"
                    func={onWriteReview}
                  />
                </ButtonContainer>
              </WriteContainer>
            </ReviewWriteContainer>
          </PlaceContent>
        </Container>
      )}
      {LoginmodalOpen && (
        <ModalPortal>
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        </ModalPortal>
      )}
      {copied && (
        <ModalPortal>
          <CopyModalContainer onClose={() => setCopied(false)}>
            <p>💻URL을 클립보드에 복사했어요.</p>
          </CopyModalContainer>
        </ModalPortal>
      )}
    </ModalContainer>
  );
}

export default PlaceInfoModal;
