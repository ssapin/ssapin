import styled from "@emotion/styled";
import ModalContainer from "../../components/containers/ModalContainer";
import { ReactComponent as KakaoLogo } from "../../assets/svgs/kakao.svg";
import USER_APIS from "../../utils/apis/useApis";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";

interface FilterModalProps {
  onClose: () => void;
}

const Container = styled.div`
  max-width: 600px;
  height: 100%;

  text-align: center;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  letter-spacing: -5%;
`;

const Pin = styled.p`
  padding: 1rem 0;
`;

const KaKakoLoginButton = styled.button`
  background-color: #fee500;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  height: fit-content;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in;
  & > div {
    display: flex;
    align-items: center;
    height: ${(props) => props.theme.fontSizes.h2};
  }
  svg {
    align-items: center;
    margin-right: 0.5rem;
  }
  &:hover {
    transform: translateY(-2px);
    background-color: #dfc908;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`;

function FilterModal({ onClose }: FilterModalProps) {
  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <FilterChoiceButton />
        <ButtonContainer>
          <ConfirmButton type="submit" text="검색" />
          <CancelButton type="button" text="취소" />
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default FilterModal;
