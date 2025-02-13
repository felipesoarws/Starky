import { CSSTransition } from "react-transition-group";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay active">
        <div className="modal-content bg-[#ececec] lg:max-w-[75vw] lg:p-[2vw]">
          <button
            className="cursor-pointer lufga-reg modal-close text-[#5860f0] lg:top-[-1.5vw] lg:right-[1vw] lg:text-[5vw] hover:text-[#131986] "
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
