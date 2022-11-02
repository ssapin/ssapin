import React, { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import MapCard from "../../components/card/MapCard";
import PlaceCard from "../../components/card/PlaceCard";

const MyBookmarkContainer = styled.div`
  background-color: orange;
  display: block;
  justify-content: center;
  align-items: center;
`;

// 북마크 - 지도 div
const BookmarkMapContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
  }
`;

// 북마크 - 장소 div
const BookmarkPlaceContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
  }
`;

const ToggleGroup = styled.div`
  width: 33%;
  height: ${pixelToRem(41)};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  border-radius: ${pixelToRem(10)};
  margin: 5% 33.5%;
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(10)};
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    color: ${(props) => props.theme.colors.gray500};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(10)};
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
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
            <div>
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
            </div>
            <div>
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
            </div>
            <div>
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
              <MapCard
                icon="🧛‍♂️"
                title="나 오늘 집에 안갈래"
                user="허설래미저쩔래미"
                usercnt={5000}
                placecnt={50}
              />
            </div>
          </BookmarkMapContainer>
        )}
        {type === 1 && (
          <BookmarkPlaceContainer>
            <div>
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
            </div>
            <div>
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
              <PlaceCard
                isAdmin
                place="역삼 멀티캠퍼스"
                address="서울시 남은열의 더보기 롯데월드타월"
                review="내가 여기서 더보기를 구경하다니 말도 안돼 놀랄 노자야!"
              />
            </div>
          </BookmarkPlaceContainer>
        )}
      </div>
    </MyBookmarkContainer>
  );
}
