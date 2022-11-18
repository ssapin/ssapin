/* eslint-disable react/jsx-no-useless-fragment */
import styled from "@emotion/styled";
import { useState } from "react";
import useIntersect from "../../utils/hooks/useIntersect";
import { Children } from "../../utils/types/common";

const Section = styled.section`
  min-height: 500px;
`;

function IntersectContainer({ children }: Children) {
  const [open, setOpen] = useState(false);
  const onIntersect = () => {
    setOpen(true);
  };
  const intersectionRef = useIntersect<HTMLDivElement>(onIntersect);
  return <Section ref={intersectionRef}>{open && <>{children}</>}</Section>;
}

export default IntersectContainer;
