import { CSSTransition } from "react-transition-group";
import "../styles/modal.css";

const Modal = ({ isOpen, onClose, children, width, bgColor }) => {
  if (!isOpen) return null;
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="modal-overlay active transition-all ease-in-out duration-[.3s] ">
        <div
          className={`${width ? width : ""} ${
            bgColor === "blue"
              ? "bg-[var(--blue-light)]"
              : "bg-[var(--white-gray)]"
          } modal-content  p-4 rounded-2xl lg:p-[2vw] lg:rounded-[1.3vw] overflow-hidden`}
        >
          <button
            className={`${
              bgColor === "blue"
                ? "text-[var(--white-light)]"
                : "text-[var(--blue-light)]"
            } z-1000  cursor-pointer transition-all ease-in-out duration-[.3s] lufga-reg modal-close  text-5xl -top-1 right-2 lg:top-[-.2vw] lg:right-[1vw] lg:text-[5vw] hover:text-[var(--blue-midnight)]`}
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
