import { CSSTransition } from "react-transition-group";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay active">
        <div className="modal-content bg-[var(--white-gray)] lg:max-w-[55vw] lg:p-[2vw] lg:rounded-[1.3vw]">
          <button
            className="z-1000  cursor-pointer transition-all ease-in-out duration-[.3s] lufga-reg modal-close text-[var(--blue-light)] lg:top-[-1.5vw] lg:right-[1vw] lg:text-[5vw] hover:text-[var(--blue-midnight)]"
            onClick={onClose}
          >
            ×
          </button>
          <div className="text-[var(--gray-dark)]">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
