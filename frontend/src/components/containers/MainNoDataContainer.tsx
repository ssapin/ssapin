import styled from "@emotion/styled";
import React from "react";
import { Children } from "../../utils/types/common";

const NoContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray500};
  font-family: ${(props) => props.theme.fontFamily.h5};
`;

function MainNoDataContainer({ children }: Children) {
  return <NoContainer>{children}</NoContainer>;
}

export default MainNoDataContainer;
