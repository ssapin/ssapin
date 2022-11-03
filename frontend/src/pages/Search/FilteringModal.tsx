import styled from "@emotion/styled";
import ModalContainer from "../../components/containers/ModalContainer";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { IMap } from "../../utils/types/map.interface";
import { mapApis } from "../../utils/apis/mapApi";
import axiosInstance from "../../utils/apis/api";

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

const ButtonContainer = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    margin-right: 2rem;
  }
`;

function FilterModal({ onClose }: FilterModalProps) {
  con
  const filterCheck = () => {
    console.log(props.hashTag);
  };
  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <FilterChoiceButton />
        <ButtonContainer>
          <ConfirmButton type="submit" text="검색" func={filterCheck} />
          <CancelButton type="button" text="취소" func={onClose} />
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default FilterModal;
