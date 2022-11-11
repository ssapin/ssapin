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

interface PlaceModalProps {
  onClose: () => void;
  mapId: number;
  place: IKakaoPlace;
  type: number;
}

const Container = styled.div`
  width: 50vw;
  max-width: 925px;
  height: 100%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  letter-spacing: -5%;
`;
const PlaceContainer = styled.div`
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
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
  }
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const ImageContainer = styled.div`
  text-align: center;
  width: auto;
  height: 100%;
  ${(props) => props.theme.mq.tablet} {
    height: fit-content;
  }
`;
const ReviewContainer = styled.div`
  width: 50%;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
  div {
    margin-bottom: 0.5rem;
  }
`;

const Comment = styled.input`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-top: 1rem;
  border: 2px solid ${(props) => props.theme.colors.DeepBlue};
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;
const ButtonContainer = styled.div`
  text-align: center;
  button {
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;

const MapContainer = styled.div`
  width: auto;
  height: auto%;
  border-radius: 15px;

  ${(props) => props.theme.mq.tablet} {
    width: auto;
    height: 150px;
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

  ${(props) => props.theme.mq.tablet} {
    width: 100%;
    height: 40px;
    margin: auto;
    margin-top: 0.3rem;
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

declare global {
  interface Window {
    kakao: any;
  }
}

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
    if (place) {
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
    }
  }, [innerWidth]);
  useEffect(() => {
    if (place) {
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
    }
  }, []);

  const addPlace = async () => {
    console.log(place);
    console.log(mapId);
    console.log(`타입: ${type}`);

    const dplace: IPlaceMin = getKakaoPlace(place);
    const data: IAddPlace = getRequestPlace(dplace, mapId);
    let id: number = 0;
    console.log(type);
    if (type === 1) {
      const response = await axiosInstance.post(PLACE_APIS.MAP, data);
      console.log(response);
      // try {
      //   console.log(response);

      //   if (response.status === 200) {
      //     id = response.data;

      //     if (ratePlace !== 0) {
      //       const reviewData: IReviewPlace = {
      //         placeId: id,
      //         emojiType: ratePlace,
      //         content: text,
      //       };

      //       registerReview(reviewData);
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    } else {
      //모여지도 ~
      const response = await axiosInstance.post(PLACE_APIS.TOGETHERMAP, data);

      // try {
      //   console.log(response);

      //   if (response.status === 200) {
      //     id = response.data;

      //     if (ratePlace !== 0) {
      //       const reviewData: IReviewPlace = {
      //         placeId: id,
      //         emojiType: ratePlace,
      //         content: text,
      //       };

      //       registerReview(reviewData);
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }

    onClose();
  };

  useEffect(() => {
    if (isOpen === false) setRatePlace(0);
  }, [isOpen]);

  console.log(ratePlace);

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <PlaceContainer>
          <PlaceTitle>{place.place_name}</PlaceTitle>
          {place.address_name}
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
            {isOpen && (
              <Comment
                onChange={onChange}
                placeholder="장소에 대한 솔직한 의견 적어주세요"
                value={text}
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
