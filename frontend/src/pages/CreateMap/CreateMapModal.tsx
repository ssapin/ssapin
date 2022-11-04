import styled from "@emotion/styled";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import SwitchButton from "../../components/Buttons/SwitchButton";
import ModalContainer from "../../components/containers/ModalContainer";
import Input from "../../components/etc/Input";

interface ModalProps {
  onClose: () => void;
}

const Container = styled.div`
  max-width: 814px;
  width: 50vw;
  height: 100%;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};

  margin: 0.5rem;
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

function CreateMapModal({ onClose }: ModalProps) {
  return (
    <ModalContainer onClose={onClose}>
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
              <SwitchButton textLeft="혼자 찍을래!" textRight="같이 찍을래!" />
            </Content>
            <Content>
              <SubTitle>아이콘(3개까지)</SubTitle>
              <Input width="" height="41px" placeholder="" />
            </Content>
          </DivBox>
          <FilterChoiceButton type="create" />
          <Flex>
            <ConfirmButton type="submit" text="만들기" />
            <CancelButton type="button" text="취소" func={onClose} />
          </Flex>
        </Form>
      </Container>
    </ModalContainer>
  );
}

export default CreateMapModal;
