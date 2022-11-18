import styled from "@emotion/styled";
import { Children } from "../../utils/types/common";

const RankingContainer = styled.div<MainCardListContainerProps>`
  width: 95%;
  display: grid;
  margin: auto;
  margin-top: 1rem;
  grid-template-columns: ${(props) =>
    props.column
      ? `repeat(auto-fill, minmax(${props.column}%, 1fr))`
      : "repeat(auto-fill, minmax(30%, 1fr))"};
  grid-gap: 2rem;
  margin-bottom: 1rem;
  justify-items: center;

  ${(props) => props.theme.mq.tablet} {
    grid-template-columns: ${(props) =>
      props.tabletColumn
        ? `repeat(auto-fill, minmax(${props.tabletColumn}%, 1fr))`
        : "repeat(auto-fill, minmax(40%, 1fr))"};
  }
  ${(props) => props.theme.mq.mobile} {
    grid-template-columns: ${(props) =>
      props.mobileColumn
        ? `repeat(auto-fill, minmax(${props.mobileColumn}%, 1fr))`
        : "repeat(auto-fill, minmax(80%, 1fr))"};
  }
`;

interface MainCardListContainerProps extends Children {
  column?: number;
  tabletColumn?: number;
  mobileColumn?: number;
}

function MainCardListContainer({
  children,
  column,
  tabletColumn,
  mobileColumn,
}: MainCardListContainerProps) {
  return (
    <RankingContainer
      column={column}
      tabletColumn={tabletColumn}
      mobileColumn={mobileColumn}
    >
      {children}
    </RankingContainer>
  );
}

export default MainCardListContainer;
