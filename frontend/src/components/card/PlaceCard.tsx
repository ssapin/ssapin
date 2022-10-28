import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";

type PlaceCardProps = {
  place: string;
  address: string;
  review: string;
  isAdmin: boolean;
  // eslint-disable-next-line react/require-default-props
  func: () => void;
  // eslint-disable-next-line react/require-default-props
  deleteFunc?: () => void;
};

const Container = styled.div<{ isAdmin: boolean }>`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  margin: 1rem;
  width: 22rem;
  height: 9rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;

  .place {
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }

  .address {
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }

  .review {
    height: 30%;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2bold};
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
`;

function PlaceCard({
  place,
  address,
  review,
  isAdmin,
  func,
  deleteFunc,
}: PlaceCardProps) {
  return (
    <Container onClick={func} isAdmin={isAdmin}>
      <p className="place">{place}</p>
      <p className="address">{address}</p>
      <p className="review">{review}</p>
      {isAdmin && (
        <div className="delete">
          <TrashIcon className="trashIcon" onClick={deleteFunc} />
        </div>
      )}
    </Container>
  );
}

export default PlaceCard;
