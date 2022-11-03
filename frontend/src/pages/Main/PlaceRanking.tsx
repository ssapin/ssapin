import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import HotPlaceCard from "../../components/card/HotPlaceCard";
import { IPlaceRanking } from "../../utils/types/place.interface";

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

type PlaceProps = {
  places: IPlaceRanking;
};

function PlaceRanking({ places }: PlaceProps) {
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
          place={
            places !== undefined && places.review !== null
              ? places.review.title
              : "장소가 없습니다."
          }
          address={
            places !== undefined && places.review !== null
              ? places.review.address
              : "장소가 없습니다."
          }
          message="🔥 리뷰가 불타고 있어요"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.pin !== null
              ? places.review.title
              : "장소가 없습니다."
          }
          address={
            places !== undefined && places.pin !== null
              ? places.review.address
              : "장소가 없습니다."
          }
          message="📌 가장 많은 지도에 찍힌 장소"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.bookmark !== null
              ? places.review.title
              : "장소가 없습니다."
          }
          address={
            places !== undefined && places.bookmark !== null
              ? places.review.address
              : "장소가 없습니다."
          }
          message="💘 싸핀러들이 킹왕짱 찜한 장소"
        />
      </RankingContainer>
    </Container>
  );
}

export default PlaceRanking;
