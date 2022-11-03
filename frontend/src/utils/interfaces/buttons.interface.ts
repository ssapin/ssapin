import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type?: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
  emoji?: string | undefined;
}

export interface IToggleButton {
  children?: ReactNode;
  func?: () => void;
  textLeft?: string;
  textRight?: string;
  title?: string;
  content?: string;
}

export interface ICheckboxProps {
  type?: "button" | "reset" | undefined;
  checked?: boolean;
  onChange?: () => void;
  label?: string | null;
  text?: string | number;
}
