import styled from "@emotion/styled";
import { useState } from "react";
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
  width: 80%;
  height: 30px;
  background-color: ${(props) => props.theme.colors.gray200};
  text-align: center;
  margin: auto;
  border-radius: 15px;
  margin-bottom: 1.5rem;

  .inactive {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: transparent;
    font-size: ${(props) => props.theme.fontSizes.h5};
  }

  .active {
    width: 50%;
    height: 100%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.colors.mainDark};
    color: ${(props) => props.theme.colors.white};
    font-size: ${(props) => props.theme.fontSizes.h5};
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
`;
const Content = styled.div``;

const HashForm = styled.div`
  display: flex;
  display-direction: column;
`;

const SubTitle = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};
`;

function CreateMapModalPc() {
  const [type, setType] = useState(0);
  const changeType = (type: number) => {
    setType(type);
  };
  return (
    <Container>
      <Form>
        <p className="title">지도만들기</p>
        <DivBox>
          <Content>
            <h5>제목</h5>
            <Input
              width={"350px"}
              height={""}
              placeholder={"ex) 역삼 멀캠 근처 조용한 카페"}
            />
          </Content>
          <Content>
            <SubTitle>캠퍼스</SubTitle>
            <Input width={""} height={""} placeholder={""} />
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
                스팟
              </button>
              <button
                type="button"
                className={type === 1 ? "active" : "inactive"}
                onClick={() => changeType(1)}
              >
                축제
              </button>
            </ToggleGroup>
          </Content>
          <Content>
            <SubTitle>아이콘(3개까지)</SubTitle>
            <Input width={""} height={""} placeholder={""} />
          </Content>
        </DivBox>
        <p className="s1">이모지바로가기</p>
        <HashForm>
          <SubTitle>#인원</SubTitle>
        </HashForm>
        <HashForm>
          <SubTitle>#특징</SubTitle>
        </HashForm>
        <HashForm>
          <SubTitle>#목적</SubTitle>
        </HashForm>
        <HashForm>
          <SubTitle>#시간대</SubTitle>
        </HashForm>
      </Form>
    </Container>
  );
}

export default CreateMapModalPc;
