import styled from "@emotion/styled";

type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  changeFunc?: (e: any) => void;
  value?: string;
  readonly?: boolean;
};

const Container = styled.div<{ width?: string; height?: string }>`
  input {
    width: ${(props) => `${props.width}`};
    height: ${(props) => `${props.height}`};
    background-color: ${(props) => props.theme.colors.lightLightBlue};
    border: 0;
    border-radius: 10px;
    margin: 0.5rem;
    outline: none;
    color: ${(props) => props.theme.colors.gray700};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.h5};

    :read-only {
      background-color: ${(props) => props.theme.colors.gray200};
    }
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.h5};
  }
`;

function Input({
  value,
  width,
  height,
  placeholder,
  readonly,
  changeFunc,
}: InputProps) {
  return (
    <Container width={width} height={height}>
      {readonly ? (
        <input
          type="text"
          value={value}
          onChange={changeFunc}
          placeholder={placeholder}
          readOnly
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={changeFunc}
          placeholder={placeholder}
        />
      )}
    </Container>
  );
}

export default Input;
