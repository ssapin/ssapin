import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import PlaceRatingButton from "../../components/Buttons/RatePlaceButton";
import ModalContainer from "../../components/containers/ModalContainer";
import testMap from "../../assets/image/testmapPic.png";

interface PlaceModalProps {
  onClose: () => void;
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
  width: 50%;
  img {
    width: 90%;
    height: auto;
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

function AddPlaceModal({ onClose }: PlaceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ratePlace, setRatePlace] = useState(0);
  const toggleActive = (key: number) => {
    setRatePlace(key);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen === false) setRatePlace(0);
  }, [isOpen]);

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <PlaceContainer>
          <PlaceTitle>설이 마음속</PlaceTitle>
          <p>사랑시 고백구 행복동</p>
        </PlaceContainer>
        <PlaceContent>
          <ImageContainer>
            <img alt="testmap.png" src={testMap} />
          </ImageContainer>

          <ReviewContainer>
            <div>장소평가</div>
            <PlaceRatingButton ratePlace={ratePlace} func={toggleActive} />
            {isOpen && <Comment placeholder="의견을 입력해봐라" />}
          </ReviewContainer>
        </PlaceContent>
        <ButtonContainer>
          <ConfirmButton used="modal" type="submit" text="추가" />
          <CancelButton used="modal" type="button" text="취소" func={onClose} />
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default AddPlaceModal;
