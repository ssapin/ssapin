import styled from "@emotion/styled";
import { ChangeEvent, FormEvent } from "react";
import { ReactComponent as SearchIcon } from "../../assets/svgs/search.svg";

type MapSearchProps = {
  width: string;
  height: string;
  changeFunc?: (e: ChangeEvent<HTMLInputElement>) => void;
  clickFunc?: (e: FormEvent<HTMLFormElement>) => void;
  value?: string;
};

const SearchBar = styled.form<{ width?: string; height?: string }>`
  position: relative;
  width: ${(props) => `${props.width}`};
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 350px;

  ${(props) => props.theme.mq.mobile} {
    border-radius: 20px;
  }

  :focus-within {
    input::placeholder {
      color: ${(props) => props.theme.colors.mainBlue};
    }
    button {
      fill: ${(props) => props.theme.colors.mainBlue};
    }
  }

  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 3px solid white;
    border-radius: 40px;
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4};
    color: ${(props) => props.theme.colors.gray50};
    outline: none;
    transition: all 0.3s ease-in-out;
    padding: 1rem 3rem;
    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.h5};
      font-family: ${(props) => props.theme.fontFamily.h5};
      padding: 0.5rem 2rem;
    }
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.gray50};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h4};
    font-family: ${(props) => props.theme.fontFamily.h4};

    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.h5};
      font-family: ${(props) => props.theme.fontFamily.h5};
    }
  }

  input:focus {
    background-color: ${(props) => props.theme.colors.gray50};
    color: ${(props) => props.theme.colors.mainBlue};
    transition: all 0.3s ease-in-out;

    ${(props) => props.theme.mq.mobile} {
      font-size: ${(props) => props.theme.fontSizes.h5};
      font-family: ${(props) => props.theme.fontFamily.h5};
    }
  }

  button {
    position: absolute;
    right: 1rem;
    fill: ${(props) => props.theme.colors.gray50};
    cursor: pointer;
    transition: all 0.2s ease-out;
    top: 50%;
    transform: translateY(-50%);
    :hover {
      scale: 1.05;
    }
    ${(props) => props.theme.mq.mobile} {
      > svg {
        height: 18px;
        width: 18px;
      }
    }
  }
`;

function MapSearch({
  width,
  height,
  changeFunc,
  clickFunc,
  value,
}: MapSearchProps) {
  return (
    <SearchBar width={width} height={height} onSubmit={clickFunc}>
      <input
        type="text"
        onChange={changeFunc}
        placeholder="내가 원하는 지도 찾기"
        value={value}
      />
      <button type="submit" aria-label="submit button">
        <SearchIcon />
      </button>
    </SearchBar>
  );
}

export default MapSearch;
