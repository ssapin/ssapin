import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { Children } from "../../utils/types/common";

interface ModalProps extends Children {
  onClose: () => void;
}

const ModalBackground = styled.div`
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

const ModalWrapper = styled.div`
  width: fit-content;
  //height: fit-content;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 20px;
  padding: ${pixelToRem(40)};
  ${(props) => props.theme.mq.mobile} {
    padding: 2rem;
  }
`;

function ModalContainer({ onClose, children }: ModalProps) {
  return (
    <ModalBackground onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </ModalBackground>
  );
}

export default ModalContainer;