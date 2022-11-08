import styled from "@emotion/styled";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { pixelToRem } from "../../utils/functions/util";

const TiedBoxes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .active {
    background-color: ${(props) => props.theme.colors.mainYellow};
  }
`;

const StyledCampus = styled.button`
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
  line-height: 1.21;
  letter-spacing: ${pixelToRem(-0.7)};
  text-align: center;
  background-color: ${(props) => props.theme.colors.gray0};
  &:hover {
    background-color: ${(props) => props.theme.colors.subYellow};
    scale: 1.05;
  }
`;

type CampusProps = {
  // eslint-disable-next-line react/require-default-props
  campusId?: number;
  // eslint-disable-next-line react/require-default-props
  open?: () => void;
  // eslint-disable-next-line react/require-default-props
  select?: (key: number) => void;
};

export default function CampusButton({ campusId, open, select }: CampusProps) {
  const campus = CAMPUS_LIST;
  const toggleActive = (key: number) => {
    select(key);
    open();
  };

  return (
    <TiedBoxes>
      {campus.map(
        (el, id) =>
          id >= 1 && (
            <StyledCampus
              value={el}
              className={`${campusId === id ? "active" : ""}`}
              onClick={() => toggleActive(id)}
              // eslint-disable-next-line react/no-array-index-key
              key={id}
            >
              {el}
            </StyledCampus>
          ),
      )}
    </TiedBoxes>
  );
}
