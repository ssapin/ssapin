import styled from "@emotion/styled";
import { ReactComponent as SearchIcon } from "../../assets/svgs/search.svg";

type MapSearchProps = {
  width: string;
  height: string;
  // eslint-disable-next-line react/require-default-props
  changeFunc?: (e: any) => void;
  // eslint-disable-next-line react/require-default-props
  clickFunc?: () => void;
};

const SearchBar = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  background-color: transparent;
  border: 3px solid white;
  border-radius: 40px;
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  min-width: 350px;

  :focus-within {
    background-color: ${(props) => props.theme.colors.gray50};

    .searchButton {
      fill: ${(props) => props.theme.colors.mainBlue};
    }
  }

  input {
    width: 90%;
    height: 100%;
    background-color: transparent;
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
    background-color: ${(props) => props.theme.colors.gray50};
    color: ${(props) => props.theme.colors.mainBlue};
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

function MapSearch({ width, height, changeFunc, clickFunc }: MapSearchProps) {
  return (
    <SearchBar width={width} height={height}>
      <input
        type="text"
        onChange={changeFunc}
        placeholder="내가 원하는 지도 찾기"
      />
      <SearchIcon className="searchButton" onClick={clickFunc} />
    </SearchBar>
  );
}

export default MapSearch;
