import styled from "@emotion/styled";
import React from "react";
import { ModalProps } from "../../utils/types/common";
import ModalBackgroud from "./ModalBackgroud";

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.colors.gray0};
  padding: 0.25rem 0.5rem;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
`;

function CopyModalContainer({ onClose, children }: ModalProps) {
  return (
    <ModalBackgroud onClose={onClose}>
      <Wrapper>{children}</Wrapper>
    </ModalBackgroud>
  );
}

export default CopyModalContainer;
