import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as BackArrowIcon } from "../../assets/svgs/backarrow.svg";

const BackBtnBg = styled.button`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: ${pixelToRem(10)};
  background-color: ${(props) => props.theme.colors.lightBlue};
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .arrow-size {
    width: 50px;
    height: 50px;
  }
`;

interface IBackButtonProps {
  type?: string;
  mapId?: string;
}

export default function BackButton({ type, mapId }: IBackButtonProps) {
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  const moveMap = () => {
    navigate(`/maps/${mapId}/detail`);
  };

  const moveTogethermap = () => {
    navigate(`/togethermaps/${mapId}/detail`);
  };
  const moveTomain = () => {
    navigate(`/`);
  };

  if (type === "map")
    return (
      <BackBtnBg onClick={moveMap}>
        <BackArrowIcon className="arrow-size" />
      </BackBtnBg>
    );
  if (type === "togethermap")
    return (
      <BackBtnBg onClick={moveTogethermap}>
        <BackArrowIcon className="arrow-size" />
      </BackBtnBg>
    );
  if (type === "main") {
    return (
      <BackBtnBg onClick={moveTomain}>
        <BackArrowIcon className="arrow-size" />
      </BackBtnBg>
    );
  }

  return (
    <BackBtnBg onClick={moveBack}>
      <BackArrowIcon className="arrow-size" />
    </BackBtnBg>
  );
}
