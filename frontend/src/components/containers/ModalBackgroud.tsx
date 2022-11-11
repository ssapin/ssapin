import styled from "@emotion/styled";
import { Children, ModalProps } from "../../utils/types/common";

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
`;

function ModalBackgroud({ onClose, children }: ModalProps) {
  return <ModalContainer onClick={onClose}>{children}</ModalContainer>;
}

export default ModalBackgroud;
