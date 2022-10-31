import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
}

// 이부분 수정하기 -> 토글버튼의 타입은 뭐가 필요한가요 쭈압
export interface IToggleButton {
  children?: ReactNode;
  text1?: string;
  text2?: string;
  type?: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  toggle?: number | string | boolean | undefined;
}

export interface ICheckboxProps {
  type: "button" | "reset" | undefined;
  checked?: boolean;
  onChange?: () => void;
  label?: string | null;
  text?: string | number;
}
