import styled from "@emotion/styled";
import { useState } from "react";
import { InfiniteData, QueryObserverResult } from "react-query";
import { useRecoilValue } from "recoil";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import PlaceInfoModal from "../../pages/Place/PlaceInfoModal";
import { userInformationState } from "../../store/atom";
import { IPlace } from "../../utils/types/place.interface";
import ModalPortal from "../containers/ModalPortalContainer";

type PlaceCardProps = {
  prop: IPlace;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  refetch?: () => Promise<
    QueryObserverResult<
      InfiniteData<
        | {
            result: any;
            page: any;
          }
        | undefined
      >,
      unknown
    >
  >;
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
    display: block;
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

  .delete {
    position: absolute;
    margin-bottom: 5rem;
    margin-left: 18rem;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.lightBlue};
    > p {
      color: ${(props) => props.theme.colors.gray0};
    }
  }
`;

function PlaceCard({ prop, isAdmin, refetch }: PlaceCardProps) {
  const [placeInfomodalOpen, setPlaceInfoModalOpen] = useState(false);
  const user = useRecoilValue(userInformationState);

  const onDeletePlace = () => {
    alert(`${prop.placeId}번 장소~ 지우고 싶대`);
  };

  const handlePlaceInfoModal = () => {
    setPlaceInfoModalOpen(true);
  };

  return (
    <>
      <Container onClick={handlePlaceInfoModal}>
        <p className="place">
          {prop !== undefined ? prop.title : "장소가 없습니다"}
        </p>
        <p className="address">
          {prop !== undefined ? prop.address : "장소가 없습니다"}
        </p>
        <p className="review">
          {prop !== undefined && !prop.reviewContent && !prop.content
            ? "아직 등록된 리뷰가 없습니다."
            : prop?.reviewContent || prop?.content}
        </p>
        {isAdmin && prop.userId === user.userId && (
          <div className="delete">
            <TrashIcon className="trashIcon" onClick={onDeletePlace} />
          </div>
        )}
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
}

export default PlaceCard;
