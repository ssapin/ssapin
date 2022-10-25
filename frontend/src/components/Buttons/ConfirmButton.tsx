import React from "react";
import styled from "@emotion/styled";

// export interface IButtonProps {
//   children?: ReactNode;
//   text?: string;
//   type: "button" | "cancel" | undefined;
//   func?: () => void;
//   disabled?: boolean;
//   color?: string;
// }

// 확인 버튼 스타일
const StyledConfirm = styled.button`
  position: relative;
  width: 71px;
  height: 67px;
  margin: 2px 5px 29px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.lightBlue};
`;

export default function ConfirmButton() {
  return <StyledConfirm>확인</StyledConfirm>;
}
