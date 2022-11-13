import styled from "@emotion/styled";
import { fadeIn } from "../../styles/animations";
import { pixelToRem } from "../../utils/functions/util";
import { ModalProps } from "../../utils/types/common";
import ModalBackground from "./ModalBackgroud";

const ModalWrapper = styled.div`
  width: fit-content;
  background-color: ${(props) => props.theme.colors.gray0};
  border-radius: 20px;
  padding: ${pixelToRem(40)};
  ${(props) => props.theme.mq.mobile} {
    padding: 2rem;
  }
  animation: ${fadeIn} 0.3s ease-in-out;
`;

function ModalContainer({ onClose, children }: ModalProps) {
  return (
    <ModalBackground onClose={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </ModalBackground>
  );
}

export default ModalContainer;
