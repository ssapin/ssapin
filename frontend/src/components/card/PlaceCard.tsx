import styled from "@emotion/styled";
import { forwardRef, LegacyRef, useState } from "react";
import { InfiniteData, QueryObserverResult } from "react-query";
import { useRecoilValue } from "recoil";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import PlaceInfoModal from "../../pages/Place/PlaceInfoModal";
import { userInformationState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import PLACE_APIS from "../../utils/apis/placeApi";
import { IPlace } from "../../utils/types/place.interface";
import ModalPortal from "../containers/ModalPortalContainer";

type PlaceCardProps = {
  prop: IPlace;
  isAdmin: boolean;
  mapId?: number;
  togethermapId?: number;
  refetch?: () => any;
};

const Container = styled.li`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  width: 100%;
  height: 7rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
  transition: all 0.3s ease-in-out;

  ${(props) => props.theme.mq.mobile} {
    height: 5rem;
    margin: 0;
  }

  .place {
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h5bold};
    font-size: ${(props) => props.theme.fontSizes.h5};

    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .address {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};

    width: 100%;
    text-align: left;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .review {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2bold};

    width: 100%;
    text-align: left;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.lightBlue} !important;
    > p {
      color: ${(props) => props.theme.colors.gray0};
    }
  }
`;

const PlaceCard = forwardRef(
  (
    { prop, isAdmin, refetch, mapId, togethermapId }: PlaceCardProps,
    ref: LegacyRef<HTMLLIElement>,
  ) => {
    const [placeInfomodalOpen, setPlaceInfoModalOpen] = useState(false);
    const user = useRecoilValue(userInformationState);
    const onDeletePlace = async (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      if (isAdmin && prop.userId !== user.userId) {
        // eslint-disable-next-line no-alert
        alert("본인이 등록한 장소가 아니예요~");
        return;
      }

      // eslint-disable-next-line no-alert
      if (!window.confirm("정말.. 삭제하시려구요..? (•́ ̯•̀)")) return;
      if (mapId) {
        const response = await axiosInstance.delete(PLACE_APIS.MAP, {
          data: { mapId, placeId: prop.placeId },
        });

        try {
          if (response.status === 200) {
            // eslint-disable-next-line no-alert
            if (refetch) refetch();
          }
        } catch (err) {
          console.log(err);
        }
      } else if (togethermapId) {
        const response = await axiosInstance.delete(PLACE_APIS.TOGETHERMAP, {
          data: { togethermapId, placeId: prop.placeId },
        });

        try {
          if (response.status === 200) {
            if (refetch) refetch();
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    const handlePlaceInfoModal = () => {
      setPlaceInfoModalOpen(true);
    };

    return (
      <>
        <Container onClick={handlePlaceInfoModal} ref={ref}>
          <p className="place">
            {prop !== undefined ? prop.title : "장소가 없습니다"}
            {isAdmin && prop.userId === user.userId && (
              <TrashIcon className="trashIcon" onClick={onDeletePlace} />
            )}
          </p>
          <p className="address">
            {prop !== undefined ? prop.address : "장소가 없습니다"}
          </p>
          <p className="review">
            {prop !== undefined && !prop.reviewContent && !prop.content
              ? "😉 아직 등록된 리뷰가 없습니다."
              : prop?.reviewContent || prop?.content}
          </p>
        </Container>
        {placeInfomodalOpen && (
          <ModalPortal>
            <PlaceInfoModal
              placeId={prop.placeId}
              onClose={() => {
                setPlaceInfoModalOpen(false);
                if (refetch) refetch();
              }}
            />
          </ModalPortal>
        )}
      </>
    );
  },
);

export default PlaceCard;
