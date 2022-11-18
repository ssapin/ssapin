import React from "react";
import { Children } from "../../utils/types/common";
import IntersectContainer from "./IntersectContainer";
import MainSectionContainer from "./MainSectionContainer";

function IntersectSectionContainer({ children }: Children) {
  return (
    <IntersectContainer>
      <MainSectionContainer>{children}</MainSectionContainer>
    </IntersectContainer>
  );
}

export default IntersectSectionContainer;
