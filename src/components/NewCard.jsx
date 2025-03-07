import PropTypes from "prop-types";
import Modal from "./Modal";
import { PlusCircle } from "@phosphor-icons/react";

const NewCard = ({
  isNewCardModalOpen,
  closeNewCardModal,
  formData,
  newCategory,
  missingInput,
  twoCategories,
  selectRef,
  groupedFlashcards,
  handleNewCardInputChange,
  handleNewCategoryChange,
  handleNewCardSubmit,
}) => {
  return (
    <div className={`modal-overlay ${isNewCardModalOpen ? "active" : ""}`}>
      <Modal
        isOpen={isNewCardModalOpen}
        onClose={closeNewCardModal}
        width={"w-[15rem] lg:w-[55vw]"}
      >
        <div className="relative flex items-start">
          <h2 className="lufga-bold text-2xl lg:text-[2.5vw]">Novo Card</h2>
        </div>
        <form
          className="flex flex-col items-start justify-center gap-2 lg:gap-[2vw] lg:flex-row"
          onSubmit={handleNewCardSubmit}
        >
          <div className="flex flex-col lg:gap-[.8vw] lg:w-[50vw]">
            <div className="flex flex-col items-start gap-1 justify-start lg:gap-[1vw]  lg:flex-row lg:items-center">
              <div>
                <h3 className="text-[var(--gray-light)] text-[1.1rem] lg:text-[1.1vw] lg:w-[12vw]">
                  Categorias existentes
                </h3>
              </div>
              <div className="bg-[var(--blue-light)] text-[#fff] flex px-[.8rem] py-[.3rem] rounded-[1.3rem] w-[100%] gap-2 lg:px-[.8vw] lg:py-[.4vw] lg:rounded-[1.3vw] lg:w-[100%]  lg:gap-[1vw]">
                <select
                  name="category"
                  id="category"
                  className="border-none outline-none w-[100%] text-[.9rem] lg:text-[1vw]"
                  value={formData.category}
                  onChange={handleNewCardInputChange}
                  ref={selectRef}
                >
                  <option
                    value=""
                    className="bg-[var(--blue-midnight)] text-[#fff] text-[.9rem] lg:text-[1vw]"
                  >
                    -
                  </option>
                  {groupedFlashcards &&
                    Object.keys(groupedFlashcards).map((category) => (
                      <option
                        key={category}
                        value={category}
                        name={category}
                        className="bg-[var(--blue-midnight)] text-[#fff] text-[.9rem] lg:text-[1vw]"
                      >
                        {category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-2 lg:gap-[1vw] lg:mt-0 lg:flex-row lg:items-start">
              <div>
                <h3 className="text-[var(--gray-light)] text-[.9rem] w-[8rem] lg:text-[1.1vw] lg:w-[9vw]">
                  Nova categoria:
                </h3>
              </div>
              <div className="lg:w-[100%]">
                <input
                  type="text"
                  className="bg-[#ececec] text-[var(--blue-light)] border-[var(--blue-light)] outline-none border-[0.2vw] px-[.8rem] py-[.2rem] rounded-[1rem] w-[100%] text-[.9rem] lg:px-[.8vw] lg:py-[.2vw] lg:rounded-[1.3vw] lg:w-[100%] lg:gap-[1vw] lg:text-[1vw]"
                  name="category"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                />
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <textarea
                name="question"
                value={formData.question}
                onChange={handleNewCardInputChange}
                placeholder="Escreva sua pergunta"
                className="resize-none w-[100%] h-[15vh] px-[.8rem] py-[.5rem]  border-[0.2vw] rounded-[1rem] text-[.9rem] lg:h-[30vh] lg:p-[1vw]  lg:rounded-[1.3vw] lg:text-[1vw]"
              ></textarea>
            </div>
          </div>
          <div className="w-[100%] lg:w-[50vw] flex flex-col lg:gap-[.4vw]">
            <div>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleNewCardInputChange}
                placeholder="Escreva sua resposta"
                className="resize-none w-[100%] h-[15vh] px-[.8rem] py-[.5rem] border-[0.2vw] rounded-[1rem] text-[.9rem] lg:h-[35vh] lg:p-[1vw] lg:rounded-[1.3vw] lg:text-[1vw]"
              ></textarea>
            </div>
            <div className="flex flex-col items-start justify-start  mt-2 lg:gap-[.6vw] lg:flex-row lg:mt-0">
              <button
                type="submit"
                className="flex items-center cursor-pointer bg-[var(--blue-midnight)] transition-all ease-in-out duration-[.3s] text-[#fff] px-[1rem] py-[.7rem] rounded-[1.3rem] w-[100%] text-[.9rem] gap-2 lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[45%] text-left lg:text-[1.1vw] lg:gap-[.5vw] hover:bg-[var(--blue-light)]"
              >
                <PlusCircle size={27} color="#ececec" />
                Criar Card
              </button>

              {twoCategories && (
                <span
                  className={`${
                    missingInput ? "errorActive" : "opacity-0"
                  } bg-[#e90b0b] text-[#fff] text-left mt-3 px-[1rem] py-[.7rem] rounded-[1.3rem] w-[100%] text-[.7rem] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[55%]  lg:text-[.7vw] lg:mt-0 lg:h-[7vh]`}
                >
                  Selecione somente uma categoria.
                </span>
              )}

              {!twoCategories && missingInput && (
                <span
                  className={`${
                    missingInput ? "errorActive" : "opacity-0"
                  } bg-[#e90b0b] text-[#fff] text-left mt-3 px-[1rem] py-[.7rem] rounded-[1.3rem] w-[100%] text-[.7rem] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[55%]  lg:text-[.7vw] lg:mt-0`}
                >
                  Preencha todos os campos.
                </span>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

NewCard.propTypes = {
  isNewCardModalOpen: PropTypes.bool.isRequired,
  closeNewCardModal: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  newCategory: PropTypes.string.isRequired,
  missingInput: PropTypes.bool.isRequired,
  twoCategories: PropTypes.bool.isRequired,
  selectRef: PropTypes.any.isRequired,
  groupedFlashcards: PropTypes.array.isRequired,
  handleNewCardInputChange: PropTypes.func.isRequired,
  handleNewCategoryChange: PropTypes.func.isRequired,
  handleNewCardSubmit: PropTypes.func.isRequired,
};

export default NewCard;
