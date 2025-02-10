import { CSSTransition } from "react-transition-group";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay active">
        <div className="modal-content bg-[#ececec] lg:max-w-[75vw] lg:p-[2vw]">
          <button
            className="lufga-reg modal-close text-[#202020] lg:top-[-2vw] lg:right-[.8vw] lg:text-[6vw]"
            onClick={onClose}
          >
            ×
          </button>
          <div className="text-[#202020]">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
