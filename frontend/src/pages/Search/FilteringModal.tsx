import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ModalContainer from "../../components/containers/ModalContainer";
import FilterChoiceButton from "../../components/Buttons/FilterChoiceButton";
import ConfirmButton from "../../components/Buttons/ConfirmButton";
import CancelButton from "../../components/Buttons/CancelButton";
import { IMap } from "../../utils/types/map.interface";
import { mapApis } from "../../utils/apis/mapApi";
import axiosInstance from "../../utils/apis/api";
import { campusState } from "../../store/atom";
import { useRecoilState } from "recoil";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";

interface FilterModalProps {
  onClose: () => void;
}

const Container = styled.div`
  max-width: 600px;
  height: 100%;

  font-family: ${(props) => props.theme.fontFamily.h3};
  font-size: ${(props) => props.theme.fontSizes.h4};
  line-height: 29px;
  letter-spacing: -5%;
`;

const ButtonContainer = styled.div`
  text-align: center;

  margin-top: 1rem;
  flex-direction: row;
  button {
    margin: 1rem;
  }
`;

function FilterModal({ onClose }: FilterModalProps) {
  const [hashTag, setHashTag] = useState([]);
  const [campusId] = useRecoilState(campusState);
  const onChangeTag = (checked: any, item: any) => {
    if (checked) {
      setHashTag([...hashTag, item]);
    } else if (!checked) {
      setHashTag(hashTag.filter((el: any) => el !== item));
    }
  };


  return (
    <ModalContainer onClose={onClose}>
      <Container>
        <FilterChoiceButton func={onChangeTag} hashTag={hashTag} />
        <ButtonContainer>
          <ConfirmButton
            used="modal"
            type="submit"
            text="검색"
            func={mapApis.getMapList(campusId, 0, hashTag, "")}
          />
          <CancelButton used="modal" type="button" text="취소" func={onClose} />
        </ButtonContainer>
      </Container>
    </ModalContainer>
  );
}

export default FilterModal;
