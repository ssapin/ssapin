import styled from "@emotion/styled";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SubmitHandler, useForm } from "react-hook-form";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import SwitchButton from "../../components/Buttons/SwitchButton";
import { campusState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { getMap, MAP_APIS } from "../../utils/apis/mapApi";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import Header from "../../components/etc/Header";
import { FormValues, Input, WarnDiv } from "./CreateMapModal";
import WarningContainer from "../../components/containers/WarningContainer";
import { REGEXES } from "../../utils/constants/regex";

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
  const defaultCampusId = useRecoilValue(campusState);
  const [campusId, setCampusId] = useState(defaultCampusId);
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");
  const [access, setAccess] = useState(false);
  const [mapId] = useState(
    new URLSearchParams(window.location.search).get("mapId") || "",
  );
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      emoji: "",
      campus: defaultCampusId,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isEdit) {
      const body = {
        campusId: data.campus,
        title: data.title,
        emoji: data.emoji,
        access,
        mapId,
        hashtagList: hashTag,
      };
      const response = await axiosInstance.patch(MAP_APIS.MAP, body);
      try {
        if (response.status === 200) {
          // eslint-disable-next-line no-alert
          alert(`수정되었습니다.`);
          navigate(`/mypage`);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const body = JSON.stringify({
        campusId: data.campus,
        title: data.title,
        emoji: data.emoji,
        access,
        hashtagList: hashTag,
      });
      const response = await axiosInstance.post(MAP_APIS.MAP, body);
      try {
        if (response.status === 200) {
          navigate(`/maps/${response?.data}/detail`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (mapId !== "") {
      getMap(Number(mapId)).then((data) => {
        setCampusId(data.campusId);
        setEmoji(data.mapEmoji);
        setAccess(data.access);
        setTitle(data.title);
        // eslint-disable-next-line array-callback-return
        data.hashtagList.map((hashtag: any) => {
          hashTag.push(hashtag.hashtagId);
        });
        setIsEdit(true);
      });
    }
  }, [mapId]);

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

  const moveToPrev = () => {
    navigate(-1);
  };

  return (
    <>
      <HeadContainer>
        <Header func={toggleActive} />
      </HeadContainer>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="title">지도만들기</p>
          <DivBox>
            <Content>
              <Input
                {...register("title", {
                  required: true,
                  maxLength: 20,
                })}
                placeholder="ex) 역삼 멀캠 근처 조용한 카페"
                disabled={isEdit}
                maxLength={20}
              />
              <WarnDiv>
                {errors.title && (
                  <WarningContainer text="20자 이하로 작성해주세요." />
                )}
              </WarnDiv>
            </Content>
          </DivBox>
          <DivBox>
            <Content>
              <SubTitle>캠퍼스</SubTitle>
              <select
                name="campus"
                {...register("campus", { required: true })}
                disabled={isEdit}
              >
                {campus.map(
                  (option, idx) =>
                    idx >= 1 && (
                      <option key={option} value={idx}>
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
                disabled={isEdit}
              />
            </Content>
          </DivBox>
          <DivBox>
            <Content>
              <SubTitle>아이콘(3개까지)</SubTitle>
              <Input
                {...register("emoji", {
                  required: true,
                  pattern: REGEXES.EMOJI,
                  maxLength: 6,
                })}
                maxLength={6}
                disabled={isEdit}
                placeholder="ex) 🎈🎆🎇"
              />
              <WarnDiv>
                {errors.emoji && (
                  <WarningContainer text="이모지만 입력해주세요.🙏 🙏" />
                )}
              </WarnDiv>
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
            {isEdit ? (
              <ConfirmButton type="submit" text="수정하기" />
            ) : (
              <ConfirmButton type="submit" text="만들기" />
            )}
            <CancelButton type="button" text="취소" func={moveToPrev} />
          </Flex>
        </Form>
      </Container>
    </>
  );
}

export default CreateMapMobilePage;
