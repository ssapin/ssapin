import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import HotPlaceCard from "../../components/card/HotPlaceCard";

const Container = styled.div<{ innerWidth: number }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  padding-right: ${(props) => (props.innerWidth < 550 ? `7vw` : `20vw`)};
  margin-top: 3rem;
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

function PlaceRanking() {
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
        📍 <span>캠퍼스 근처 핫플레이스</span>
      </Title>
      <Description innerWidth={innerWidth}>
        싸핀러들에게 가장 핫한 장소들을 리뷰/핀/찜 순으로 보여드려요 😊
      </Description>
      <RankingContainer innerWidth={innerWidth}>
        <HotPlaceCard
          place="바나프레소 테헤란로점"
          address="서울특별시 강남구 역삼동 718-2"
          message="🔥 리뷰가 불타고 있어요"
        />
        <HotPlaceCard
          place="바나프레소 테헤란로점"
          address="서울특별시 강남구 역삼동 718-2"
          message="📌 가장 많은 지도에 찍힌 장소"
        />
        <HotPlaceCard
          place="바나프레소 테헤란로점"
          address="서울특별시 강남구 역삼동 718-2"
          message="💘 싸핀러들이 킹왕짱 찜한 장소"
        />
      </RankingContainer>
    </Container>
  );
}

export default PlaceRanking;
