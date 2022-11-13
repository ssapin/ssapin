import styled from "@emotion/styled";

const ToggleGroup = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  border-radius: 10px;
  margin: 8px;
  > button {
    :disabled {
      cursor: not-allowed;
    }
  }
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    color: ${(props) => props.theme.colors.gray500};
    :disabled {
      background-color: ${(props) => props.theme.colors.gray200};
    }
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    :disabled {
      background-color: ${(props) => props.theme.colors.gray500};
    }
  }
`;

type SwitchProps = {
  textLeft: string;
  textRight: string;
  type: boolean;
  func: (e: any) => void;
  disabled: boolean;
};

export default function SwitchButton({
  textLeft,
  textRight,
  func,
  type,
  disabled,
}: SwitchProps) {
  return (
    <ToggleGroup>
      <button
        type="button"
        className={type === false ? "active" : "inactive"}
        onClick={() => func(false)}
        disabled={disabled}
      >
        {textLeft}
      </button>
      <button
        type="button"
        className={type === true ? "active" : "inactive"}
        onClick={() => func(true)}
        disabled={disabled}
      >
        {textRight}
      </button>
    </ToggleGroup>
  );
}
