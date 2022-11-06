import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import SwitchButton from "../../components/Buttons/SwitchButton";
import Input from "../../components/etc/Input";
import { campusState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { mapApis } from "../../utils/apis/mapApi";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import NavBar from "../Navbar/Navbar";

const Container = styled.div`
  width: 90%;
  height: fit-content;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};
  margin: auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .title {
    font-size: ${(props) => props.theme.fontSizes.h1};
    text-align: center;
    font-family: ${(props) => props.theme.fontFamily.h1bold};
    margin-bottom: 2rem;
  }
  .s1 {
    font-size: ${(props) => props.theme.fontSizes.s1};
    text-align: right;
  }
`;
const DivBox = styled.div`
  margin-bottom: 1rem;
`;

const FilterBox = styled.div`
  padding: 0.5rem;
  text-align: center;

  div {
    margin-bottom: 1rem;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 80px;
  margin: auto;

  select {
    width: 100%;
    height: 41px;
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
`;

const SubTitle = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h5};
  text-align: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;

  button {
    margin: 0.5rem;
  }
`;

const HeadContainer = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.mainBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function CreateMapMobilePage() {
  const [hashTag, setHashTag] = useState([]);
  const campus = CAMPUS_LIST;
  const [defaultCampusId, setCampusdefaultId] = useRecoilState(campusState);
  const [campusId, setCampusId] = useState(defaultCampusId);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [access, setAccess] = useState(false);

  const toggleActive = (key: number) => {
    setCampusdefaultId(key);
  };

  const onChangeTag = (checked: any, item: any) => {
    if (checked) {
      setHashTag([...hashTag, item]);
    } else if (!checked) {
      setHashTag(hashTag.filter((el: any) => el !== item));
    }
  };

  const onChangeCampusId = (e: { target: { value: any } }) => {
    setCampusId(e.target.value);
  };

  const onChangeTitle = (e: { target: { value: SetStateAction<string> } }) => {
    setTitle(e.target.value);
  };

  const onChangeEmoji = (e: { target: { value: SetStateAction<string> } }) => {
    setEmoji(e.target.value);
  };

  const onChangeAccess = (e: boolean) => {
    setAccess(e);
  };

  const navigate = useNavigate();
  const moveToPrev = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title) {
      // eslint-disable-next-line no-alert
      alert("지도 제목을 입력해주세요.");
      return;
    }

    if (title.length > 20) {
      // eslint-disable-next-line no-alert
      alert("지도 제목은 20자 이내로 입력해주세요.");
      return;
    }

    if (!emoji) {
      // eslint-disable-next-line no-alert
      alert("아이콘을 하나라도 입력해주세요.");
      return;
    }

    const regex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    if (!regex.test(emoji)) {
      // eslint-disable-next-line no-alert
      alert("아이콘에는 이모지만 입력해주세요.");
      return;
    }

    if (emoji.length > 6) {
      // eslint-disable-next-line no-alert
      alert("아이콘은 3개만 입력이 가능합니다.");
      return;
    }

    const body = JSON.stringify({
      campusId,
      title,
      emoji,
      access,
      hashtagList: hashTag,
    });

    const response = await axiosInstance.post(mapApis.map, body);

    try {
      if (response.status === 200) {
        // eslint-disable-next-line no-alert
        alert(`등록되었습니다.${response?.data}번 지도`);
        navigate("/search");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <HeadContainer>
        <NavBar func={toggleActive} />
      </HeadContainer>
      <Container>
        <Form onSubmit={handleSubmit}>
          <p className="title">지도만들기</p>
          <DivBox>
            <Content>
              <SubTitle>제목</SubTitle>
              <Input
                width="100%"
                height="41px"
                placeholder="ex) 역삼 멀캠 근처 조용한 카페"
                changeFunc={onChangeTitle}
              />
            </Content>
          </DivBox>
          <DivBox>
            <Content>
              <SubTitle>캠퍼스</SubTitle>
              <select
                onChange={onChangeCampusId}
                defaultValue={defaultCampusId}
              >
                {campus.map(
                  (option, idx) =>
                    idx >= 1 && (
                      <option
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        value={idx}
                      >
                        {option}
                      </option>
                    ),
                )}
              </select>
            </Content>
          </DivBox>
          <DivBox>
            <Content>
              <SubTitle>장소추가</SubTitle>
              <SwitchButton
                textLeft="혼자 찍을래!"
                textRight="같이 찍을래!"
                type={access}
                func={onChangeAccess}
              />
            </Content>
          </DivBox>
          <DivBox>
            <Content>
              <SubTitle>아이콘(3개까지)</SubTitle>
              <Input
                width="100%"
                height="41px"
                placeholder="ex) 🎈🎆🎇"
                changeFunc={onChangeEmoji}
              />
            </Content>
          </DivBox>
          <FilterBox>
            <FilterChoiceButton
              type="create"
              func={onChangeTag}
              hashTag={hashTag}
            />
          </FilterBox>
          <Flex>
            <ConfirmButton type="submit" text="만들기" />
            <CancelButton type="button" text="취소" func={moveToPrev} />
          </Flex>
        </Form>
      </Container>
    </>
  );
}

export default CreateMapMobilePage;
