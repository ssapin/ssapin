import styled from "@emotion/styled";
import HotPlaceCard from "../../components/card/HotPlaceCard";
import { IPlaceRanking } from "../../utils/types/place.interface";

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

const RankingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;

  ${(props) => props.theme.mq.tablet} {
    flex-direction: column;
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
`;

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

type PlaceProps = {
  places: IPlaceRanking;
};

function PlaceRanking({ places }: PlaceProps) {
  return (
    <Container>
      <Title>
        📍 <span>캠퍼스 근처 핫플레이스</span>
      </Title>
      <Description>
        싸핀러들에게 가장 핫한 장소들을 리뷰/핀/찜 순으로 보여드려요 😊
      </Description>
      <RankingContainer>
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
