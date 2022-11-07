import styled from "@emotion/styled";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";

interface FilterModalProps {
  hashTag: number[];
  onChangeTag: (checked: any, item: any) => void;
  onClose: () => void;
  onReset: () => void;
}

const Container = styled.div`
  max-width: 600px;
  height: 100%;
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  letter-spacing: -5%;
`;

const ButtonContainer = styled.div`
  text-align: center;

  margin-top: 1rem;
  flex-direction: row;
  button {
    margin: 1rem;
  }
`;

function FilterModal({
  hashTag,
  onClose,
  onChangeTag,
  onReset,
}: FilterModalProps) {
  return (
    <div>
      <Container>
        <FilterChoiceButton func={onChangeTag} hashTag={hashTag} />
        <ButtonContainer>
          <ConfirmButton
            used="modal"
            type="submit"
            text="검색"
            func={onClose}
          />
          <CancelButton used="modal" type="button" text="취소" func={onReset} />
        </ButtonContainer>
      </Container>
    </div>
  );
}

export default FilterModal;
