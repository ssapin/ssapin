import styled from "@emotion/styled";
import Carousel from "react-material-ui-carousel";
import Footer from "../../components/etc/Footer";
import MapSearch from "../../components/etc/MapSearch";
import Item from "./Item";

const HeadContainer = styled.div`
  width: 100%;
  height: 70vh;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Navbar = styled.div`
  width: 100%;
  height: 15%;
`;

const QuestionContainer = styled.div`
  width: 100%;
  height: 60%;
  text-align: center;
`;

const Searchbar = styled.div`
  width: 100%;
  height: 25%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MainPage() {
  const items = [
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "일과 끝나고 어디서 공부하시나요?",
    },
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "내가 뽑은 캠퍼스 근처 최고 맛집은?",
    },
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "히잉.. 꼬르륵.. 돈이없을 때 먹는 갓성비 식당은?",
    },
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "싸피의 Refresh Time! 점심시간에 가장 많이 가는 카페?",
    },
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "캠퍼스 근처에서 가장 놀기 좋은 장소는 어디인가요?",
    },
    {
      emoji: "",
      place: 129,
      mapId: 1,
      description: "아주머니 단무지는 빼주세요.. 혼밥 최고 장소는?",
    },
  ];

  return (
    <>
      <HeadContainer>
        <Navbar>navbar</Navbar>
        <QuestionContainer>
          <Carousel>
            {items.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </QuestionContainer>
        <Searchbar>
          <MapSearch width="50%" height="40%" />
        </Searchbar>
      </HeadContainer>
      <Footer />
    </>
  );
}

export default MainPage;
