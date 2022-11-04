import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// import MapCard from "../../components/card/MapCard";
import { MemoInfiniteList } from "../../components/infinite/MapInfiniteList";
import { campusState } from "../../store/atom";
import { MAP_APIS } from "../../utils/apis/mapApi";
// import { IMap } from "../../utils/types/map.interface";
import Skeleton from "./Skeleton";

const Container = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => props.innerWidth < 550 && `7vw`};
  padding-right: ${(props) => props.innerWidth < 550 && `7vw`};

  padding-left: ${(props) => props.innerWidth >= 1700 && `19vw`};
  padding-right: ${(props) => props.innerWidth >= 1700 && `19vw`};

  padding-left: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};
  padding-right: ${(props) =>
    props.innerWidth >= 550 && props.innerWidth < 1700 && `14vw`};

  margin-top: 4rem;
`;

const Title = styled.div<{ innerWidth: number }>`
  padding-left: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: center;

  span {
    display: inline;
  }
`;

function SearchList() {
  const [campusId] = useRecoilState(campusState);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <Container innerWidth={innerWidth}>
      <Title innerWidth={innerWidth}>
        <span>🗺 추천지도 🗺</span>
      </Title>
      <MemoInfiniteList
        url={MAP_APIS.GET_MAP_LIST(campusId)}
        queryKey={["MapList"]}
        SkeletonCardComponent={Skeleton}
        zeroDataText="없어시붕"
        count={3}
      />
    </Container>
  );
}
export default SearchList;
