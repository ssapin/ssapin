import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TogetherMapCard from "../../components/card/TogetherMapCard";
import { ITogetherMap } from "../../utils/types/togethermap.interface";

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

const RankingContainer = styled.div<{ innerWidth?: number }>`
  display: flex;
  flex-direction: ${(props) => (props.innerWidth < 950 ? `column` : `row`)};
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const Title = styled.div<{ innerWidth: number }>`
  padding-left: ${(props) => (props.innerWidth < 950 ? `0` : `1rem`)};
  font-size: ${(props) => props.theme.fontSizes.h2};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h2bold};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};

  span {
    display: inline;
    box-shadow: inset 0 -25px 0 ${(props) => props.theme.colors.subYellow};
  }
`;

const Description = styled.div<{ innerWidth: number }>`
  padding-top: 1rem;
  padding-left: ${(props) => (props.innerWidth < 950 ? `1rem` : `2rem`)};
  padding-right: ${(props) => (props.innerWidth < 950 ? `1rem` : `0`)};
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: ${(props) => (props.innerWidth < 950 ? `center` : `left`)};
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

type TogetherMapProps = {
  maps: ITogetherMap[];
};

function TogetherMapList({ maps }: TogetherMapProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  return (
    <Container innerWidth={innerWidth}>
      <Title innerWidth={innerWidth}>
        🎪 <span>모여지도</span>
      </Title>
      <Description innerWidth={innerWidth}>
        테마별 자신의 베스트 1위! 장소를 등록해보세요 🥳
      </Description>
      <RankingContainer innerWidth={innerWidth}>
        {maps.length !== 0 &&
          maps.map(
            (map, id) =>
              id <= 2 && (
                <TogetherMapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  title={map.title}
                  usercnt={map.userCnt}
                  func={() =>
                    navigate(`/togethermaps/${map.togethermapId}/detail`)
                  }
                />
              ),
          )}
        {maps?.length === 0 && <NoContainer>없어요</NoContainer>}
      </RankingContainer>
      <RankingContainer innerWidth={innerWidth}>
        {maps.length >= 3 &&
          maps.map(
            (map, id) =>
              id >= 3 && (
                <TogetherMapCard
                  // eslint-disable-next-line react/no-array-index-key
                  key={id}
                  title={map.title}
                  usercnt={map.userCnt}
                />
              ),
          )}
        {maps?.length === 0 && <NoContainer>없어요</NoContainer>}
      </RankingContainer>
    </Container>
  );
}

export default TogetherMapList;
