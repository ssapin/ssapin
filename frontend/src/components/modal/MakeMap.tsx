import styled from "@emotion/styled";


const Container = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.mainNavy};
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  margin: 0.5rem;
`;


function MakeMap() {
  return (
    <Container>
        <h2>메롱</h2>
    </Container>
  );
}

export default MakeMap;
