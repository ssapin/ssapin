export type Props = {};

export interface Children {
  children: JSX.Element;
}

export interface ModalProps extends Children {
  onClose: () => void;
}

export interface MessageResponse {
  message: string;
}
