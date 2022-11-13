import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { InfiniteData, QueryObserverResult } from "react-query";
import { ReactComponent as TrashIcon } from "../../assets/svgs/trashcan.svg";
import { ReactComponent as EditIcon } from "../../assets/svgs/pencil.svg";
import { userInformationState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { MAP_APIS } from "../../utils/apis/mapApi";
import { IMap } from "../../utils/types/map.interface";
import CreateMapModal from "../../pages/CreateMap/CreateMapModal";
import ModalPortal from "../containers/ModalPortalContainer";

type MapCardProps = {
  prop: IMap;
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

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 10px;
  width: 100%;
  height: 8rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem 0 1rem;
  transition: all 0.2s ease-out;
  position: relative;

  .access {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .icon {
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h5bold};
  }

  .title {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h5};
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h5bold};

    width: 100%;
    text-align: center;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .user {
    margin-top: 0.7rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.s2};
    color: ${(props) => props.theme.colors.gray500};
    font-family: ${(props) => props.theme.fontFamily.s2};

    ${(props) => props.theme.mq.mobile} {
      margin-top: 0.3rem;
    }
  }

  :hover {
    scale: 1.06;
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  font-size: ${(props) => props.theme.fontSizes.s2};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.s2bold};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .editIcon {
    margin-right: 0.1rem;
    margin-bottom: -0.05rem;

    :hover {
      scale: 1.06;
      cursor: pointer;
    }
  }

  .trashIcon {
    :hover {
      scale: 1.06;
      cursor: pointer;
    }
  }
`;

function MapCard({ prop, isAdmin, refetch }: MapCardProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);
  const user = useRecoilValue(userInformationState);
  const navigate = useNavigate();
  const onClickMap = () => {
    navigate(`/maps/${prop.mapId}/detail`);
  };
  const [modalOpen, setModalOpen] = useState(false);

  const onDeleteMap = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (isAdmin && prop.userId !== user.userId) {
      // eslint-disable-next-line no-alert
      alert("본인의 지도가 아니예요~😉");
      return;
    }

    // eslint-disable-next-line no-alert
    if (!window.confirm("정말로... 삭제하실거예요..?(•́ ̯•̀)")) return;

    const response = await axiosInstance.delete(MAP_APIS.MAP, {
      data: { mapId: prop.mapId },
    });

    try {
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert(`지도가 삭제되었습니다.. 다시.. 만들어주실거죠..?`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEditModal = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (innerWidth > 950) setModalOpen(true);
    else navigate(`/mobilecreate?mapId=${prop.mapId}`);
  };

  return (
    <>
      <Container onClick={onClickMap}>
        {!prop.access && <p className="access">🔒</p>}
        {/* {prop.access && <p className="access">👫</p>} */}
        <p className="icon">{prop.mapEmoji}</p>
        <p className="title">{prop.title}</p>
        <p className="user">{`${prop.userEmoji} ${prop.nickname}`}</p>
        <Bottom>
          <div className="delete">
            {isAdmin && prop.userId === user.userId && (
              <>
                <EditIcon className="editIcon" onClick={onEditModal} />
                <TrashIcon className="trashIcon" onClick={onDeleteMap} />
              </>
            )}
          </div>
          <p className="summary">
            📌 {prop.placeCnt} &nbsp; 🙋‍♂️ {prop.userCnt}
          </p>
        </Bottom>
      </Container>
      {modalOpen && (
        <ModalPortal>
          <CreateMapModal
            onClose={() => setModalOpen(false)}
            mapId={prop.mapId}
            refetch={refetch}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default MapCard;
