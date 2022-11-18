import styled from "@emotion/styled";
import { skeletonGradient } from "../../styles/animations";

const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 8rem;
  box-shadow: 1px 3px 12px 0px ${(props) => props.theme.colors.gray300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
  transition: all 0.2s ease-out;
  position: relative;
  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
  gap: 1rem;
  > div {
    height: 1.5rem;
    animation: ${skeletonGradient} 1.8s infinite ease-in-out;
    border-radius: 5px;
    &:first-of-type {
      width: 90%;
    }
    &:last-of-type {
      width: 50%;
    }
  }
`;

function SkeletonCard() {
  return (
    <Container>
      <div />
      <div />
    </Container>
  );
}

export default SkeletonCard;
