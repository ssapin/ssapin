import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { BigYellowButton } from "../../components/Buttons/YellowButton";

type ItemProps = {
  item: {
    emoji: string;
    place: number;
    mapId: number;
    description: string;
  };
};

const ItemContainer = styled.div<{ size: number }>`
  width: 100%;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 1rem 0 1rem;

  p {
    font-size: ${(props) =>
      props.size >= 740 ? props.theme.fontSizes.h1 : props.theme.fontSizes.h3};
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.fontFamily.h1bold};
  }
`;

function Item({ item }: ItemProps) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  });

  const placeText = `${item.place}개의 장소들!`;
  return (
    <Paper style={{ backgroundColor: "transparent", boxShadow: "0 0 0 0" }}>
      <ItemContainer size={innerWidth}>
        <p>{item.emoji}</p>
        <p>{item.description}</p>
        <BigYellowButton
          type="button"
          text1={placeText}
          text2="참여하러 가기"
        />
      </ItemContainer>
    </Paper>
  );
}

export default Item;
