import styled from "@emotion/styled";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import TogetherMapCard from "../../components/card/TogetherMapCard";
import { campusState } from "../../store/atom";
import { fadeIn } from "../../styles/animations";
import { getTogetherMapList } from "../../utils/apis/togethermapApi";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
  animation: ${fadeIn} 1s ease-in forwards;
`;

const RankingContainer = styled.div`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;

  ${(props) => props.theme.mq.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
  }

  ${(props) => props.theme.mq.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(80%, 1fr));
  }
`;

const Title = styled.div`
  padding-left: 1rem;
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: left;

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 0;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    font-size: ${(props) => props.theme.fontSizes.h3};
  }
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
  }
`;

const NoContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
`;

function TogetherMapList() {
  const campusId = useRecoilValue(campusState);
  const { data: togetherData } = useQuery<ITogetherMap[], AxiosError>(
    [`${campusId} - togetherMapList`, `togetherMapList`],
    async () => getTogetherMapList(Number(campusId)),
  );
  return (
    <Container>
      <Title>
        🎪 <span>모여지도</span>
      </Title>
      <Description>
        테마별 자신의 베스트 1위! 장소를 등록해보세요 🥳
      </Description>
      <RankingContainer>
        {togetherData?.length !== 0 &&
          togetherData?.map((map) => (
            <TogetherMapCard key={map.togethermapId} prop={map} />
          ))}
      </RankingContainer>
      {togetherData?.length === 0 && (
        <NoContainer>아직 장소가 있는 모여지도가 없어요 😥</NoContainer>
      )}
    </Container>
  );
}

export default TogetherMapList;
