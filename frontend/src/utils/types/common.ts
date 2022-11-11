// 공통 타입 지정 폴더

import { ReactNode } from "react";

export type Props = {};

export interface Children {
  children: ReactNode;
}

export interface ModalProps extends Children {
  onClose: () => void;
}

export interface MessageResponse {
  message: string;
}
