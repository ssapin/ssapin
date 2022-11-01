import styled from "@emotion/styled";
import { useState } from "react";
import CancelButton from "../Buttons/CancelButton";
import ConfirmButton from "../Buttons/ConfirmButton";
import FilterChoiceButton from "../Buttons/FilterChoiceButton";
import Input from "../etc/Input";

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: pink;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};

  margin: 0.5rem;
`;

const ToggleGroup = styled.div`
  width: 350px;
  height: 41px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  text-align: center;
  border-radius: 10px;
  margin: 8px;
  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraph};
    color: ${(props) => props.theme.colors.gray500};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.lightBlue};
    color: ${(props) => props.theme.colors.gray0};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: ${(props) => props.theme.fontSizes.h1};
    text-align: center;
    font-family: ${(props) => props.theme.fontFamily.h1bold};
  }
  .s1 {
    font-size: ${(props) => props.theme.fontSizes.s1};
    text-align: right;
  }
`;
const DivBox = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;
const Content = styled.div`
  input {
    margin: 0 0.5rem;
  }
`;

// const HashForm = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const SubTitle = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h5};
  margin-left: 10px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

function CreateMapModalPc() {
  const [type, setType] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changeType = (type: number) => {
    setType(type);
  };
  return (
    <Container>
      <Form>
        <p className="title">지도만들기</p>
        <DivBox>
          <Content>
            <SubTitle>제목</SubTitle>
            <Input
              width="350px"
              height="41px"
              placeholder="ex) 역삼 멀캠 근처 조용한 카페"
            />
          </Content>
          <Content>
            <SubTitle>캠퍼스</SubTitle>
            <Input width="" height="41px" placeholder="" />
          </Content>
        </DivBox>
        <DivBox>
          <Content>
            <SubTitle>장소추가</SubTitle>
            <ToggleGroup>
              <button
                type="button"
                className={type === 0 ? "active" : "inactive"}
                onClick={() => changeType(0)}
              >
                나만찍을래
              </button>
              <button
                type="button"
                className={type === 1 ? "active" : "inactive"}
                onClick={() => changeType(1)}
              >
                다른놈도 찍어라!
              </button>
            </ToggleGroup>
          </Content>
          <Content>
            <SubTitle>아이콘(3개까지)</SubTitle>
            <Input width="" height="41px" placeholder="" />
          </Content>
        </DivBox>
        <FilterChoiceButton type="create" />
        <Flex>
          <ConfirmButton type="submit" text="만들기" />
          <CancelButton type="button" text="취소" />
        </Flex>
      </Form>
    </Container>
  );
}

export default CreateMapModalPc;
