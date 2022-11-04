import styled from "@emotion/styled";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { IMap } from "../../utils/types/map.interface";

type MapCardProps = {
  prop: IMap;
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
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  .icon {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }

  .title {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h4bold};
  }

  .user {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};
  }

  .summary {
    text-align: right;
    margin-top: 0.7rem;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2bold};
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

function MapCard({ prop, isAdmin }: MapCardProps) {
  const onClickMap = () => {
    alert(`${prop.mapId}번 지도~`);
  };

  const onDeletePlace = () => {
    alert(`${prop.mapId}번 장소~ 지우고 싶대`);
  };

  console.log(prop);

  return (
    <Container onClick={onClickMap}>
      <p className="icon">{prop.mapEmoji}</p>
      <p className="title">{prop.title}</p>
      <p className="user">{`${prop.userEmoji} ${prop.nickname}`}</p>
      <p className="summary">
        📌 {prop.placeCnt} &nbsp; 🙋‍♂️ {prop.userCnt}
      </p>
      {isAdmin && (
        <div className="delete">
          <TrashIcon className="trashIcon" onClick={onDeletePlace} />
        </div>
      )}
    </Container>
  );
}

export default MapCard;
