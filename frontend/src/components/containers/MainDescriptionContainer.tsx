import styled from "@emotion/styled";
import { Children } from "../../utils/types/common";

const Description = styled.div`
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 0;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .textRight {
    padding-top: 0.5rem;
    padding-right: 1rem;
    color: ${(props) => props.theme.colors.gray400};
    font-size: ${(props) => props.theme.fontSizes.s1};
    font-family: ${(props) => props.theme.fontFamily.s1};

    ${(props) => props.theme.mq.tablet} {
      padding-right: 0;
    }

    ${(props) => props.theme.mq.mobile} {
      font-family: ${(props) => props.theme.fontFamily.s1};
      font-size: ${(props) => props.theme.fontSizes.s1};
    }
  }

  ${(props) => props.theme.mq.tablet} {
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: column;
  }

  ${(props) => props.theme.mq.mobile} {
    font-family: ${(props) => props.theme.fontFamily.h5};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
  }
`;

function MainDescriptionContainer({ children }: Children) {
  return <Description>{children}</Description>;
}

export default MainDescriptionContainer;
