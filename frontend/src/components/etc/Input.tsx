import styled from "@emotion/styled";

type InputProps = {
  width: string;
  height: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  changeFunc?: (e: any) => void;
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
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-family: ${(props) => props.theme.fontFamily.h5};
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.h5};
    font-family: ${(props) => props.theme.fontFamily.h5};
  }
`;

function Input({ width, height, placeholder, changeFunc }: InputProps) {
  return (
    <Container width={width} height={height}>
      <input type="text" onChange={changeFunc} placeholder={placeholder} />
    </Container>
  );
}

export default Input;
