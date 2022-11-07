import styled from "@emotion/styled";

import { SetStateAction, useState } from "react";
import { useRecoilState } from "recoil";

// 컴포넌트
import ModalContainer from "../../components/containers/ModalContainer";
import CancelButton from "../../components/Buttons/CancelButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";

// 유저정보 불러올 때
import { userInformationState } from "../../store/atom";

// 캠퍼스 버튼을 위한 리스트
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";

// API연결
import axiosInstance from "../../utils/apis/api";
import USER_APIS from "../../utils/apis/userApis";

// 모달 타입 인터페이스
interface ChangeModalProps {
  // eslint-disable-next-line react/require-default-props
  onClose: () => void;
}

// 전체 묶은 div
const Container = styled.div`
  max-width: 600px;
  height: 100%;
  line-height: 29px;
`;

// 연관된 것만 묶은 div - 닉네임 문구 + 닉넴인풋 / 캠퍼스 문구 + 캠퍼스 버튼
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

// 버튼 묶여있음
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  flex-direction: row;
  button {
    margin: 1rem;
  }
`;
// 캠퍼스 변경 버튼 구현
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

// 이모지 변경을 위한 input 창 (둥근것)
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

// 닉네임 변경용 input 창
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

// 본격 함수
export function ChangeInfoModal({ onClose }: ChangeModalProps) {
  // 캠퍼스 정보 받아오기
  const camlist = CAMPUS_LIST;

  // 유저 이모지 이미지 받아오기 위해 정보 받기
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);

  // 유저 닉네임과 변경 이모지 저장
  const [nickname, setNickname] = useState(userInformation.nickname);
  const [emoji, setEmoji] = useState(userInformation.emoji);
  const [campus, setCampus] = useState(userInformation.campusId);

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

  //   const campusClick = (e: { preventDefault: () => void }) => {
  //     console.log(e.target.value);
  //   };
  // function > 확인 눌렀을 때 유저 정보 변경되도록 만들기
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

    if (emoji.length > 2) {
      // eslint-disable-next-line no-alert
      alert("본인을 표현할 수 있는 이모지는 1개만 가능합니다.");
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
        // eslint-disable-next-line no-alert
        alert(`성공적으로 정보가 변경되었습니다.`);
        try {
          const userResponse = await axiosInstance.get(
            USER_APIS.USER_INFORMATION,
          );
          setUserInformation(userResponse.data);
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
