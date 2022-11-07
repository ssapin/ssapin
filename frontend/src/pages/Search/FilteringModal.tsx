import styled from "@emotion/styled";
import { ReactComponent as SearchIcon } from "../../assets/svgs/search.svg";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";

interface FilterModalProps {
  hashTag: number[];
  onChangeTag: (checked: any, item: any) => void;
  onSearch: () => void;
  onReset: () => void;
  onChangeKeyword: (e: any) => void;
}

const Container = styled.div`
  max-width: 600px;
  max-height: 100vh;
  height: 100%;
  font-family: ${(props) => props.theme.fontFamily.h4};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  text-align: left;
  margin-top: 1rem;

  p {
    color: ${(props) => props.theme.colors.gray900};
    font-family: ${(props) => props.theme.fontFamily.h2bold};
    font-size: ${(props) => props.theme.fontSizes.h2};
    height: fit-content;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 0.5rem;
  height: 5%;

  button {
    width: 30%;
    margin-left: 0.5rem;
    height: 100%;

    :hover {
      scale: 1.05;
    }
  }
`;

const SearchBar = styled.div`
  width: 100%;
  height: 2.7rem;
  background-color: ${(props) => props.theme.colors.gray300};
  border: 3px solid white;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  :focus-within {
    background-color: ${(props) => props.theme.colors.mainBlue};

    .searchButton {
      fill: ${(props) => props.theme.colors.gray50};
    }
  }

  input {
    width: 90%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.gray300};
    border: 0;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4};
    color: ${(props) => props.theme.colors.gray50};
    outline: none;
    margin-left: 3rem;
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.gray50};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4};
  }

  input:focus {
    color: ${(props) => props.theme.colors.gray50};
    background-color: ${(props) => props.theme.colors.mainBlue};
  }

  .searchButton {
    background-color: transparent;
    width: auto;
    height: 50%;
    margin-right: 1rem;
    fill: ${(props) => props.theme.colors.gray50};
    cursor: pointer;
    :hover {
      scale: 1.05;
    }
  }
`;

function FilterModal({
  hashTag,
  onSearch,
  onChangeTag,
  onReset,
  onChangeKeyword,
}: FilterModalProps) {
  return (
    <Container>
      <SearchBar>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          onChange={onChangeKeyword}
        />
        <SearchIcon className="searchButton" onClick={onChangeKeyword} />
      </SearchBar>
      <hr />
      <FilterChoiceButton func={onChangeTag} hashTag={hashTag} />
      <ButtonContainer>
        <ConfirmButton used="modal" type="submit" text="검색" func={onSearch} />
        <CancelButton used="modal" type="button" text="취소" func={onReset} />
      </ButtonContainer>
    </Container>
  );
}

export default FilterModal;
