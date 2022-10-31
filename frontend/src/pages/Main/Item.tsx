import styled from "@emotion/styled";
import { Paper } from "@mui/material";

type ItemProps = {
  item: {
    emoji: string;
    place: number;
    mapId: number;
    description: string;
  };
};

const ItemContainer = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

function Item({ item }: ItemProps) {
  return (
    <Paper style={{ backgroundColor: "transparent", boxShadow: "0 0 0 0" }}>
      <ItemContainer>
        <h2>{item.emoji}</h2>
        <p>{item.description}</p>
        <button className="CheckButton" type="button">
          Check it out!
        </button>
      </ItemContainer>
    </Paper>
  );
}

export default Item;
