import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { IPlace } from "../../utils/types/place.interface";

type PlaceCardProps = {
  prop: IPlace;
  isAdmin: boolean;
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 100%;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;

  ${(props) => props.theme.mq.mobile} {
    height: 7.5rem;
    margin: 0;
  }

  .place {
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.h5bold};
      font-size: ${(props) => props.theme.fontSizes.h5};
    }

    width: 100%;
    text-align: center;
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
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .review {
    height: 30%;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2bold};

    width: 100%;
    text-align: center;
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
    scale: 1.06;
    cursor: pointer;
  }
`;

function PlaceCard({ prop, isAdmin }: PlaceCardProps) {
  const onClickPlace = () => {
    alert(`${prop.placeId}번 장소~`);
  };

  const onDeletePlace = () => {
    alert(`${prop.placeId}번 장소~ 지우고 싶대`);
  };

  return (
    <Container onClick={onClickPlace}>
      <p className="place">
        {prop !== undefined ? prop.title : "장소가 없습니다"}
      </p>
      <p className="address">
        {prop !== undefined ? prop.address : "장소가 없습니다"}
      </p>
      <p className="review">
        {prop !== undefined ? prop.reviewContent : "장소가 없습니다"}
      </p>
      {isAdmin && (
        <div className="delete">
          <TrashIcon className="trashIcon" onClick={onDeletePlace} />
        </div>
      )}
    </Container>
  );
}

export default PlaceCard;
