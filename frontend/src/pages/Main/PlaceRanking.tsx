import styled from "@emotion/styled";
import HotPlaceCard from "../../components/card/HotPlaceCard";
import { IPlaceRanking } from "../../utils/types/place.interface";

const Container = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
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
              ? places.review
              : undefined
          }
          message="🔥 리뷰가 불타고 있어요"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.pin !== null ? places.pin : undefined
          }
          message="📌 가장 많은 지도에 찍힌 장소"
        />
        <HotPlaceCard
          place={
            places !== undefined && places.bookmark !== null
              ? places.bookmark
              : undefined
          }
          message="💘 싸핀러들이 킹왕짱 찜한 장소"
        />
      </RankingContainer>
    </Container>
  );
}

export default PlaceRanking;
