import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";

const StyledShowMore = styled.button`
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.706rem;
  padding: ${pixelToRem(15)};
  flex-grow: 0;
  border-radius: ${pixelToRem(10)};
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.colors.lightBlue};
  color: ${(props) => props.theme.colors.gray0};
  text-align: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.mainBlue};
  }
  .text {
    font-size: ${(props) => props.theme.fontSizes.h3};
    line-height: 1.21;
    letter-spacing: ${pixelToRem(-1.2)};
    font-family: ${(props) => props.theme.fontFamily.h3bold};
    ${(props) => props.theme.mq.tablet} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.h4};
      font-family: ${(props) => props.theme.fontFamily.h4bold};
    }
    ${(props) => props.theme.mq.mobile} {
      border-radius: ${pixelToRem(15)};
      font-size: ${(props) => props.theme.fontSizes.h5};
      font-family: ${(props) => props.theme.fontFamily.h5bold};
    }
  }
`;

export default function ShowMoreButton() {
  const navigate = useNavigate();

  const MoreMapInfo = () => {
    navigate("/search");
  };
  return (
    <StyledShowMore onClick={MoreMapInfo}>
      <div className="text">지도 더 보러가기 🔍</div>
    </StyledShowMore>
  );
}
