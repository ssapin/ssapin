import { ReactNode } from "react";

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
}
