import { useState } from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { MemoInfiniteList } from "../../components/infinite/MyMapInfiniteList";
import USER_APIS from "../../utils/apis/useApis";

const MyMapsContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
`;

const WriteMapContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
  }
`;

const JoinedMapContainer = styled.div`
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
  ${(props) => props.theme.mq.mobile} {
    height: ${pixelToRem(32)};
    border-radius: ${pixelToRem(15)};
  }
  ${(props) => props.theme.mq.tablet} {
    height: ${pixelToRem(32)};
    border-radius: ${pixelToRem(15)};
  }
  margin: 5% 33.5%;
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: ${pixelToRem(10)};
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

export default function MyMaps() {
  const [type, setType] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeType = (type: number) => {
    setType(type);
  };

  return (
    <MyMapsContainer>
      <ToggleGroup>
        <button
          type="button"
          className={type === 0 ? "active" : "inactive"}
          onClick={() => changeType(0)}
        >
          작성
        </button>
        <button
          type="button"
          className={type === 1 ? "active" : "inactive"}
          onClick={() => changeType(1)}
        >
          참여
        </button>
      </ToggleGroup>
      {type === 0 && (
        <WriteMapContainer>
          {/* <MemoInfiniteList
            url={USER_APIS.MY_MAP}
            queryKey={["MyMapList"]}
            zeroDataText="없어시붕"
          /> */}
        </WriteMapContainer>
      )}
      {type === 1 && (
        <JoinedMapContainer>
          {/* <MemoInfiniteList
            url={USER_APIS.JOIN_MAP}
            queryKey={["JoinMapList"]}
            zeroDataText="없어시붕"
          /> */}
        </JoinedMapContainer>
      )}
    </MyMapsContainer>
  );
}
