import styled from "@emotion/styled";
import { forwardRef, LegacyRef, useState } from "react";
import { useRecoilValue } from "recoil";
import ModalPortal from "../../components/containers/ModalPortalContainer";
import { authState } from "../../store/atom";
import { pixelToRem } from "../../utils/functions/util";
import { IKakaoPlace } from "../../utils/types/place.interface";
import LoginModal from "../Login/LoginModal";
import AddPlaceModal from "../Search/AddPlaceModal";
import { ReactComponent as PlusIcon } from "../../assets/svgs/plus.svg";

const List = styled.li`
  position: relative;
  border-bottom: 1px solid #888;
  cursor: pointer;
  min-height: 65px;
`;
const MarkerBg = styled.span<{ index: number }>`
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
  background-position: 0 ${(props) => -10 - props.index * 46}px;
`;

const PlaceInfoContainer = styled.div`
  padding: 10px 0 10px 55px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: bold;
    margin-block-start: 1.67px;
    margin-block-end: 1.67px;
  }
  span {
    display: block;
    margin-top: 4px;
    &:last-of-type {
      color: #009900;
    }
  }
`;

const InfoInnerContainer = styled.div`
  position: relative;
`;

const CreateButton = styled.button`
  background-color: ${(props) => props.theme.colors.lightBlue};
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.gray0};
  transition: all 0.2s ease-in;
  align-items: center;
  display: flex;
  &:hover {
    transform: scale(1.03);
  }
  svg {
    display: block;
  }
`;

const FixContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 2;

  button {
    margin-bottom: 1rem;
    box-shadow: 0 ${pixelToRem(10)} ${pixelToRem(20)} 0 rgba(0, 0, 0, 0.25);
  }

  ${(props) => props.theme.mq.mobile} {
    right: 1rem;
    bottom: 1rem;
  }
`;

const Jibun = styled.span`
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
  color: ${(props) => props.theme.colors.gray400};
`;

interface PlaceCardProps {
  index: number;
  mouseOver: () => void;
  mouseLeave: () => void;
  place: IKakaoPlace;
  mapId: number;
}

export const PlaceCard = forwardRef(
  (
    { index, place, mouseOver, mouseLeave, mapId }: PlaceCardProps,
    ref: LegacyRef<HTMLLIElement>,
  ) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [LoginmodalOpen, setLoginModalOpen] = useState(false);
    const auth = useRecoilValue(authState);

    const handleModal = () => {
      if (auth.accessToken) setModalOpen(true);
      else setLoginModalOpen(true);
    };

    return (
      <>
        <FixContainer>
          {modalOpen && (
            <ModalPortal>
              <AddPlaceModal
                onClose={() => setModalOpen(false)}
                place={place}
                mapId={mapId}
                type={2}
              />
            </ModalPortal>
          )}
          {LoginmodalOpen && (
            <ModalPortal>
              <LoginModal onClose={() => setLoginModalOpen(false)} />
            </ModalPortal>
          )}
        </FixContainer>
        <List ref={ref} onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
          <MarkerBg index={index} />
          <PlaceInfoContainer>
            <InfoInnerContainer>
              <h4>{place.place_name}</h4>
              {place.road_address_name ? (
                <>
                  <span>{place.road_address_name}</span>
                  <Jibun>{place.address_name}</Jibun>
                </>
              ) : (
                <span>{place.address_name}</span>
              )}
              <span>{place.phone}</span>

              <CreateButton type="button" onClick={handleModal}>
                장소
                <PlusIcon className="plus" />
              </CreateButton>
            </InfoInnerContainer>
          </PlaceInfoContainer>
        </List>
      </>
    );
  },
);
