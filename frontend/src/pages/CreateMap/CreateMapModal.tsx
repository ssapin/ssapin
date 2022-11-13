/* eslint-disable react/jsx-props-no-spreading */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InfiniteData, QueryObserverResult } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import SwitchButton from "../../components/Buttons/SwitchButton";
import ModalContainer from "../../components/containers/ModalContainer";
import WarningContainer from "../../components/containers/WarningContainer";
import { campusState } from "../../store/atom";
import axiosInstance from "../../utils/apis/api";
import { getMap, MAP_APIS } from "../../utils/apis/mapApi";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { REGEXES } from "../../utils/constants/regex";

interface ModalProps {
  mapId?: number;
  onClose: () => void;
  refetch?: () => Promise<
    QueryObserverResult<
      InfiniteData<
        | {
            result: any;
            page: any;
          }
        | undefined
      >,
      unknown
    >
  >;
}

const Container = styled.div`
  max-width: 800px;
  height: 100%;
  max-height: 83vh;
  overflow-y: scroll;
  background-color: transparent;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.gray900};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .title {
    font-size: ${(props) => props.theme.fontSizes.h2};
    text-align: center;
    font-family: ${(props) => props.theme.fontFamily.h2bold};
    margin-bottom: 2rem;
  }
  .s1 {
    font-size: ${(props) => props.theme.fontSizes.s2};
    text-align: right;
  }
`;
const DivBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: fit-content;
`;

const FilterBox = styled.div`
  padding: 0.5rem;
`;

const Content = styled.div<{ edit: boolean }>`
  width: 45%;
  select {
    width: 100%;
    height: 35px;
    background-color: ${(props) =>
      props.edit
        ? props.theme.colors.gray200
        : props.theme.colors.lightLightBlue};
    border: 0;
    border-radius: 10px;
    margin: 0.5rem;
    outline: none;
    color: ${(props) => props.theme.colors.gray700};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.h5};
  }
`;

const SubTitle = styled.h5`
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray900};
  font-family: ${(props) => props.theme.fontFamily.h5};
  margin-left: 10px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    margin: 0.2rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  border: 0;
  border-radius: 10px;
  margin: 0.5rem;
  outline: none;
  color: ${(props) => props.theme.colors.gray700};
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  font-family: ${(props) => props.theme.fontFamily.h5};

  :disabled {
    background-color: ${(props) => props.theme.colors.gray200};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray400};
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    font-family: ${(props) => props.theme.fontFamily.h5};
  }
`;

export const WarnDiv = styled.div`
  height: 1.5rem;
  padding: 0 1rem;
  display: flex;
`;

export interface FormValues {
  title: string;
  emoji: string;
  campus: number;
}

function CreateMapModal({ onClose, mapId, refetch }: ModalProps) {
  const [hashTag, setHashTag] = useState([]);
  const campus = CAMPUS_LIST;
  const defaultCampusId = useRecoilValue(campusState);
  const [access, setAccess] = useState(false);
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
          refetch();
          onClose();
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
    if (!mapId) return;
    getMap(mapId).then((data) => {
      setValue("campus", data.campusId);
      setValue("emoji", data.mapEmoji);
      setValue("title", data.title);
      setAccess(data.access);
      // eslint-disable-next-line array-callback-return
      data.hashtagList.map((hashtag: any) => {
        hashTag.push(hashtag.hashtagId);
      });
      setIsEdit(true);
    });
  }, [mapId]);

  const onChangeTag = (checked: any, item: any) => {
    if (checked) {
      setHashTag([...hashTag, item]);
    } else if (!checked) {
      setHashTag(hashTag.filter((el: any) => el !== item));
    }
  };

  const onChangeAccess = (e: boolean) => {
    setAccess(e);
  };

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="title">지도만들기</p>
          <DivBox>
            <Content edit={isEdit}>
              <SubTitle>제목</SubTitle>
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
            <Content edit={isEdit}>
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
            <Content edit={isEdit}>
              <SubTitle>장소추가</SubTitle>
              <SwitchButton
                textLeft="혼자 찍을래!"
                textRight="같이 찍을래!"
                type={access}
                func={onChangeAccess}
                disabled={isEdit}
              />
            </Content>
            <Content edit={isEdit}>
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
            <ConfirmButton
              type="submit"
              text={isEdit ? "수정하기" : "만들기"}
            />
            <CancelButton type="button" text="취소" func={onClose} />
          </Flex>
        </Form>
      </Container>
    </ModalContainer>
  );
}

export default CreateMapModal;
