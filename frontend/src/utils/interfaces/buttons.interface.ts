import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
}

// 이부분 수정하기
export interface IToggleButton {
  children?: ReactNode;
  text1?: string;
  text2?: string;
  type?: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  toggle?: number | string | boolean | undefined;
}
