import { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { MemoInfiniteList } from "../../components/infinite/InfiniteList";
import USER_APIS from "../../utils/apis/userApis";
import PlaceCard from "../../components/card/PlaceCard";
import MapCard from "../../components/card/MapCard";

const MyBookmarkContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
`;

const BookmarkMapContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const BookmarkPlaceContainer = styled.div`
  width: 90%;
  margin: auto;
`;

const ToggleGroup = styled.div`
  width: 33%;
  height: ${pixelToRem(41)};
  ${(props) => props.theme.mq.mobile} {
    height: ${pixelToRem(32)};
    border-radius: ${pixelToRem(15)};
  }
  ${(props) => props.theme.mq.tablet} {
    height: ${pixelToRem(32)};
    border-radius: ${pixelToRem(15)};
  }
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  border-radius: ${pixelToRem(10)};
  margin: 5% 33.5%;
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(10)};
    background-color: transparent;
    ${(props) => props.theme.mq.mobile} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      font-family: ${(props) => props.theme.fontFamily.paragraph};
    }
    ${(props) => props.theme.mq.tablet} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      font-family: ${(props) => props.theme.fontFamily.paragraph};
    }
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-family: ${(props) => props.theme.fontFamily.h5};
    color: ${(props) => props.theme.colors.gray500};
  }
  .active {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(10)};
    ${(props) => props.theme.mq.mobile} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    }
    ${(props) => props.theme.mq.tablet} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.paragraph};
      font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    }
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-family: ${(props) => props.theme.fontFamily.h5bold};
  }
`;

export default function MyBookmark() {
  const [type, setType] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeType = (type: number) => {
    setType(type);
  };

  return (
    <MyBookmarkContainer>
      <div>
        <ToggleGroup>
          <button
            type="button"
            className={type === 0 ? "active" : "inactive"}
            onClick={() => changeType(0)}
          >
            지도
          </button>
          <button
            type="button"
            className={type === 1 ? "active" : "inactive"}
            onClick={() => changeType(1)}
          >
            장소
          </button>
        </ToggleGroup>
      </div>
      <div>
        {type === 0 && (
          <BookmarkMapContainer>
            <MemoInfiniteList
              url={USER_APIS.BOOKMARK_MAP}
              queryKey={["BOOKMARK - MapList"]}
              zeroDataText="찜한 지도가 없습니다."
              CardComponent={MapCard}
            />
          </BookmarkMapContainer>
        )}
        {type === 1 && (
          <BookmarkPlaceContainer>
            <MemoInfiniteList
              url={USER_APIS.BOOKMARK_PLACE}
              queryKey={["BOOKMARK - PlaceList"]}
              zeroDataText="찜한 장소가 없습니다."
              CardComponent={PlaceCard}
            />
          </BookmarkPlaceContainer>
        )}
      </div>
    </MyBookmarkContainer>
  );
}
