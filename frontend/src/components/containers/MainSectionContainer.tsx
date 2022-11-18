import styled from "@emotion/styled";
import { ElementType } from "react";
import { fadeIn } from "../../styles/animations";
import { Children } from "../../utils/types/common";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 4rem;
  animation: ${fadeIn} 1s ease-in forwards;
  min-height: 248px;
`;

interface MainSectionContainerProps extends Children {
  tag?: ElementType;
}

function MainSectionContainer({ children, tag }: MainSectionContainerProps) {
  return <Container as={tag}>{children}</Container>;
}

export default MainSectionContainer;
