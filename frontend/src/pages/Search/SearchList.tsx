import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { MemoInfiniteList } from "../../components/infinite/MapInfiniteList";
import { campusState } from "../../store/atom";
import { mapApis } from "../../utils/apis/mapApi";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 19vw;
  padding-right: 19vw;
  margin-top: 4rem;

  ${(props) => props.theme.mq.pc} {
    padding-left: 14vw;
    padding-right: 14vw;
  }

  ${(props) => props.theme.mq.mobile} {
    padding-left: 7vw;
    padding-right: 7vw;
  }
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: center;

  span {
    display: inline;
  }

  ${(props) => props.theme.mq.tablet} {
    padding-left: 0;
  }
`;

function SearchList() {
  const [campusId] = useRecoilState(campusState);
  return (
    <Container>
      <Title>
        <span>🗺 추천지도 🗺</span>
      </Title>
      <MemoInfiniteList
        url={mapApis.getMapList(campusId)}
        queryKey={["MapList"]}
        zeroDataText="없어시붕"
      />
    </Container>
  );
}
export default SearchList;
