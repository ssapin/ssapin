import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import ModalContainer from "../../components/containers/ModalContainer";
import testMap from "../../assets/image/testmapPic.png";
import {
  IAddPlace,
  IKakaoPlace,
  IPlaceMin,
} from "../../utils/types/place.interface";
import { getKakaoPlace, getRequestPlace } from "../../utils/functions/place";
import axiosInstance from "../../utils/apis/api";
import PLACE_APIS from "../../utils/apis/placeApi";
import { IReviewPlace, registerReview } from "../../utils/apis/reviewApi";
import { useNavigate } from "react-router-dom";

interface PlaceModalProps {
  onClose: () => void;
  mapId: number;
  place: IKakaoPlace;
  type: number;
}

const Container = styled.div`
  width: 600px;
  /* max-width: 925px; */
  height: 60vh;
  max-height: 70vh;

  ${(props) => props.theme.mq.tablet} {
    width: 70vw;
    height: fit-content;
    max-height: 85vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 15%;
  text-align: center;
  margin-bottom: 1rem;
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
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 70%;
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;

  ${(props) => props.theme.mq.tablet} {
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
    height: fit-content;
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
    width: 100%;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  width: 45%;
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};

  div {
    margin: 0;
    width: 100%;
  }

  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
    width: 100%;
    gap: 1rem;
  }
`;

const Comment = styled.textarea`
  width: 100%;
  height: 90px;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.h5};
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding: 0.5rem;
  resize: none;

  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: 100px;
    margin: auto;
  }
`;

const EmptyContainer = styled.div`
  width: 100%;
  height: 90px;
`;

const ButtonContainer = styled.div`
  height: 15%;
  text-align: center;
  button {
    margin-right: 1rem;
    margin-left: 1rem;
  }
  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: fit-content;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 15px;

  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: 150px;
  }
`;

const KakaoMapButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 10px;
  color: white;
  font-family: ${(props) => props.theme.fontFamily.h4bold};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: 40px;
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

const { kakao } = window;

function AddPlaceModal({ onClose, mapId, place, type }: PlaceModalProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const [ratePlace, setRatePlace] = useState(0);
  const [text, setText] = useState("");
  const mapRef = useRef<HTMLDivElement>();
  const onChange = (e: any) => {
    setText(e.target.value);
  };

  const toggleActive = (key: number) => {
    setRatePlace(key);
    setIsOpen(!isOpen);
    setText("");
  };

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  useEffect(() => {
    const mapContainer = mapRef.current;
    const markerPosition = new kakao.maps.LatLng(place.y, place.x);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    const mapOption = {
      center: new kakao.maps.LatLng(place.y, place.x),
      level: 3,
      marker,
    };

    const map = new kakao.maps.StaticMap(mapContainer, mapOption);
  }, [innerWidth]);

  const navigate = useNavigate();
  const addPlace = async () => {
    const dplace: IPlaceMin = getKakaoPlace(place);
    const data: IAddPlace = getRequestPlace(dplace, mapId);
    let id: number = 0;
    if (type === 1) {
      const response = await axiosInstance.post(PLACE_APIS.MAP, data);
      try {
        if (response.status === 200) {
          id = response.data;
          if (text.length === 0) {
            alert("리뷰는 아예 작성하지 않거나, 1자 이상 적어주세요");
            return;
          }
          if (ratePlace !== 0) {
            const reviewData: IReviewPlace = {
              placeId: id,
              emojiType: ratePlace,
              content: text,
            };
            registerReview(reviewData);
          }
          navigate(`/maps/${data.mapId}/detail`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const response = await axiosInstance.post(PLACE_APIS.TOGETHERMAP, data);
      try {
        if (response.status === 200) {
          id = response.data;
          if (ratePlace !== 0) {
            if (text.length === 0) {
              alert("리뷰는 아예 작성하지 않거나, 1자 이상 적어주세요");
              return;
            }
            const reviewData: IReviewPlace = {
              placeId: id,
              emojiType: ratePlace,
              content: text,
            };
            registerReview(reviewData);
          }
          navigate(`/togethermaps/${data.mapId}/detail`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (isOpen === false) setRatePlace(0);
  }, [isOpen]);

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <PlaceContainer>
          <PlaceTitle>{place.place_name}</PlaceTitle>
          <p>{place.address_name}</p>
        </PlaceContainer>
        <PlaceContent>
          <ImageContainer>
            <MapContainer ref={mapRef} />
            <KakaoMapButton
              onClick={() => {
                window.open(`https://place.map.kakao.com/${place.id}`);
              }}
            >
              카카오맵리뷰보기
            </KakaoMapButton>
          </ImageContainer>

          <ReviewContainer>
            <div>장소평가</div>
            <PlaceRatingButton ratePlace={ratePlace} func={toggleActive} />
            {innerWidth > 950 ? (
              isOpen ? (
                <Comment
                  onChange={onChange}
                  placeholder="장소에 대한 솔직한 의견 적어주세요"
                  value={text}
                  maxLength={20}
                />
              ) : (
                <EmptyContainer />
              )
            ) : (
              <Comment
                onChange={onChange}
                placeholder="장소에 대한 솔직한 의견 적어주세요"
                value={text}
                maxLength={20}
              />
            )}
          </ReviewContainer>
        </PlaceContent>
        <ButtonContainer>
          <ConfirmButton
            used="modal"
            type="button"
            text="추가"
            func={addPlace}
          />
          <CancelButton used="modal" type="button" text="취소" func={onClose} />
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default AddPlaceModal;
