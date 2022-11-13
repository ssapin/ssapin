import styled from "@emotion/styled";
import React from "react";

const Span = styled.span`
  font-family: ${(props) => props.theme.fontFamily.s2};
  font-size: ${(props) => props.theme.fontSizes.s2};
  color: ${(props) => props.theme.colors.mainRed};
`;

interface WarnProps {
  text: string;
}

function WarningContainer({ text }: WarnProps) {
  return <Span>{text}</Span>;
}

export default WarningContainer;
