import styled from "@emotion/styled";
import { KeyboardEvent, useEffect } from "react";
import { ModalProps } from "../../utils/types/common";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

interface Document {
  removeEventListener(
    type: "keyup" | "keydown",
    listener: (event: KeyboardEvent) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  addEventListener(
    type: "keyup" | "keydown",
    listener: (event: KeyboardEvent) => any,
    options?: boolean | EventListenerOptions,
  ): void;
}

function ModalBackgroud({ onClose, children }: ModalProps) {
  const escClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") {
      onClose();
    }
  };
  useEffect(() => {
    ((document: Document) =>
      document.addEventListener("keydown", escClose, true))(document);
    return () => {
      ((document: Document) =>
        document.removeEventListener("keydown", escClose, true))(document);
    };
  }, []);

  return <ModalContainer onClick={onClose}>{children}</ModalContainer>;
}

export default ModalBackgroud;
