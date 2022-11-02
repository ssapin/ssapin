import ReactDOM from "react-dom";
import { Children } from "../../utils/types/common";

function ModalPortal({ children }: Children) {
  const el = document.getElementById("modal-root") as HTMLElement;

  return ReactDOM.createPortal(children, el);
}

export default ModalPortal;
