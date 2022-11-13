import styled from "@emotion/styled";
import { SetStateAction, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ModalContainer from "../../components/containers/ModalContainer";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import { campusState, userInformationState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";
import axiosInstance from "../../utils/apis/api";
import USER_APIS from "../../utils/apis/userApis";
import { REGEXES } from "../../utils/constants/regex";

interface ChangeModalProps {
  // eslint-disable-next-line react/require-default-props
  onClose: () => void;
}

const Container = styled.div`
  max-width: 600px;
  height: 100%;
  line-height: 29px;
`;

const RelativeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  letter-spacing: -1px;
  text-align: left;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.gray600};
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  flex-direction: row;
  button {
    margin: 1rem;
  }
`;

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .active {
    background-color: ${(props) => props.theme.colors.mainYellow};
  }
`;

const StyledCampus = styled.div`
  width: ${pixelToRem(60)};
  height: ${pixelToRem(28)};
  flex-grow: 0;
  border-radius: ${pixelToRem(20)};
  flex-grow: 0;
  font-family: ${(props) => props.theme.fontFamily.s1};
  font-size: ${(props) => props.theme.fontSizes.s1};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  margin-right: 0.2rem;
  letter-spacing: ${pixelToRem(-0.7)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.subYellow};
    scale: 1.05;
  }
`;

const EmojiInput = styled.input`
  width: 150px;
  height: 150px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  border: 0;
  border-radius: 50%;
  outline: none;
  font-size: 400%;
  font-family: ${(props) => props.theme.fontFamily.h1};
  text-align: center;
`;

const NicknameInput = styled.input`
  width: 276px;
  height: 43px;
  font-family: ${(props) => props.theme.fontFamily.h3bold};
  font-size: ${(props) => props.theme.fontSizes.h3};
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  outline: none;
  text-align: center;
`;

export function ChangeInfoModal({ onClose }: ChangeModalProps) {
  const camlist = CAMPUS_LIST;
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);
  const [nickname, setNickname] = useState(userInformation.nickname);
  const [emoji, setEmoji] = useState(userInformation.emoji);
  const [campus, setCampus] = useState(userInformation.campusId);
  const setCampusId = useSetRecoilState(campusState);

  const onChangeNickname = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setNickname(e.target.value);
  };

  const onChangeEmoji = (e: { target: { value: SetStateAction<string> } }) => {
    setEmoji(e.target.value);
  };

  const onChangeCampus = (e: number) => {
    setCampus(e);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!nickname) {
      // eslint-disable-next-line no-alert
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (nickname.length > 10) {
      // eslint-disable-next-line no-alert
      alert("닉네임은 10자 이내로 입력해주세요.");
      return;
    }

    const regex = REGEXES.USEREMOJI;
    if (!regex.test(emoji)) {
      // eslint-disable-next-line no-alert
      alert("본인을 표현할 수 있는 이모지를 1개만 꼭 입력해주세요💕");
      return;
    }

    const body = JSON.stringify({
      campusId: campus,
      nickname,
      emoji,
    });

    const response = await axiosInstance.patch(
      USER_APIS.USER_INFORMATION,
      body,
    );

    try {
      if (response.status === 200) {
        try {
          const userResponse = await axiosInstance.get(
            USER_APIS.USER_INFORMATION,
          );
          setUserInformation(userResponse.data);
          setCampusId(campus);
        } catch (error) {
          console.log(error);
        }
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <form onSubmit={handleSubmit}>
          <RelativeContainer>
            <EmojiInput onChange={onChangeEmoji} value={emoji} />
          </RelativeContainer>
          <RelativeContainer>
            닉네임
            <NicknameInput onChange={onChangeNickname} value={nickname} />
          </RelativeContainer>
          <RelativeContainer>
            소속 캠퍼스
            <TiedBoxes>
              {camlist.map(
                (el, id) =>
                  id >= 1 && (
                    <StyledCampus
                      // eslint-disable-next-line react/no-array-index-key
                      key={id}
                      onClick={() => {
                        onChangeCampus(id);
                      }}
                      className={`${campus === id ? "active" : ""}`}
                    >
                      {el}
                    </StyledCampus>
                  ),
              )}
            </TiedBoxes>
          </RelativeContainer>
          <ButtonContainer>
            <ConfirmButton used="modal" type="submit" text="확인" />
            <CancelButton
              used="modal"
              type="button"
              text="취소"
              func={onClose}
            />
          </ButtonContainer>
        </form>
      </Container>
    </ModalContainer>
  );
}
