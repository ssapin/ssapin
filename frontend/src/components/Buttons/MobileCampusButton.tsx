/* eslint-disable @typescript-eslint/no-use-before-define */
import styled from "@emotion/styled";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { campusState } from "../../store/atom";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";

const ButtonContainer = styled.button`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0
    ${(props) => props.theme.colors.gray300};
  > span {
    width: 40px;
    height: 40px;
    display: block;
    background-color: ${(props) => props.theme.colors.lightBlue};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSizes.h5};
    transition: all 0.2s ease-in;
  }
  :hover {
    > span {
      background-color: ${(props) => props.theme.colors.mainBlue};
    }
  }
`;

const CampusButtonListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  padding: 0.25rem;
  > div {
    height: 40px;
  }
`;

const Container = styled.div`
  position: absolute;
  width: fit-content;
  max-height: 50px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
  bottom: 10px;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0
    ${(props) => props.theme.colors.gray300};
`;

function MobileCampusButton() {
  const buttonListRef = useRef<HTMLDivElement>();
  const campusId = useRecoilValue(campusState);

  const onClick = () => {
    if (buttonListRef.current.style.maxHeight !== "300px") {
      buttonListRef.current.style.maxHeight = "300px";
    } else {
      buttonListRef.current.style.maxHeight = "50px";
    }
  };
  return (
    <Container ref={buttonListRef}>
      <CampusButtonListContainer>
        {CAMPUS_LIST.map(
          (campus, idx) =>
            idx > 0 && (
              <CampusButton
                campus={campus}
                isClicked={idx === campusId}
                key={campus}
              />
            ),
        )}

        <div />
      </CampusButtonListContainer>
      <ButtonContainer type="button" onClick={onClick}>
        <span>🏫</span>
      </ButtonContainer>
    </Container>
  );
}

export default MobileCampusButton;

const ButtonC = styled.button<{ active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? props.theme.colors.mainYellow : props.theme.colors.gray0};
  color: ${(props) => props.theme.colors.gray900};
  margin-left: 0;
  font-family: ${(props) => props.theme.fontFamily.s2};
  font-size: ${(props) => props.theme.fontSizes.s2};
  transition: all 0.2s ease-in;
  :hover {
    background-color: ${(props) => props.theme.colors.mainYellow};
  }
`;

interface CampusProps {
  campus: string;
  isClicked: boolean;
}

function CampusButton({ campus, isClicked }: CampusProps) {
  return (
    <ButtonC type="button" active={isClicked}>
      {campus}
    </ButtonC>
  );
}
