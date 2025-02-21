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
        width={"lg:max-w-[55vw]"}
      >
        <div className="relative flex items-start">
          <h2 className="lufga-bold lg:text-[2.5vw]">Novo Card</h2>
        </div>
        <form
          className="flex items-start justify-center lg:gap-[2vw]"
          onSubmit={handleNewCardSubmit}
        >
          <div className="flex flex-col lg:gap-[.8vw] lg:w-[50vw]">
            <div className="flex items-center justify-start lg:gap-[1vw]">
              <div>
                <h3 className="text-[var(--gray-light)] lg:text-[1.1vw] lg:w-[12vw]">
                  Categorias existentes
                </h3>
              </div>
              <div className="bg-[var(--blue-light)] text-[#fff] lg:px-[.8vw] lg:py-[.4vw] lg:rounded-[1.3vw] lg:w-[100%] flex lg:gap-[1vw]">
                <select
                  name="category"
                  id="category"
                  className="border-none outline-none lg:w-[100%] lg:text-[1vw]"
                  value={formData.category}
                  onChange={handleNewCardInputChange}
                  ref={selectRef}
                >
                  <option
                    value=""
                    className="bg-[var(--blue-midnight)] text-[#fff] lg:text-[1vw]"
                  >
                    -
                  </option>
                  {groupedFlashcards &&
                    Object.keys(groupedFlashcards).map((category) => (
                      <option
                        key={category}
                        value={category}
                        name={category}
                        className="bg-[var(--blue-midnight)] text-[#fff] lg:text-[1vw]"
                      >
                        {category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-start lg:gap-[1vw]">
              <div>
                <h3 className="text-[var(--gray-light)] lg:text-[1.1vw] lg:w-[9vw]">
                  Nova categoria:
                </h3>
              </div>
              <div className="lg:w-[100%]">
                <input
                  type="text"
                  className="bg-[#ececec] text-[var(--blue-light)] border-[var(--blue-light)] outline-none lg:border-[0.2vw] lg:px-[.8vw] lg:py-[.2vw] lg:rounded-[1.3vw] lg:w-[100%] lg:gap-[1vw] lg:text-[1vw]"
                  name="category"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                />
              </div>
            </div>
            <div>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleNewCardInputChange}
                placeholder="Escreva sua pergunta"
                className="resize-none w-[100%] lg:h-[30vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw] lg:text-[1vw]"
              ></textarea>
            </div>
          </div>
          <div className="w-[50vw] flex flex-col lg:gap-[.4vw]">
            <div>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleNewCardInputChange}
                placeholder="Escreva sua resposta"
                className="resize-none w-[100%] lg:h-[33.2vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw] lg:text-[1vw]"
              ></textarea>
            </div>
            <div className="flex items-start justify-start  lg:gap-[.6vw]">
              <button
                type="submit"
                className="flex items-center cursor-pointer bg-[var(--blue-midnight)] transition-all ease-in-out duration-[.3s] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[45%] text-left lg:text-[1.1vw] lg:gap-[.5vw] hover:bg-[var(--blue-light)]"
              >
                <PlusCircle size={32} color="#ececec" />
                Criar Card
              </button>

              {twoCategories && (
                <span
                  className={`${
                    missingInput ? "errorActive" : "opacity-0"
                  } bg-[#e90b0b] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[55%] text-left lg:text-[.7vw]`}
                >
                  Selecione somente uma categoria.
                </span>
              )}

              {!twoCategories && missingInput && (
                <span
                  className={`${
                    missingInput ? "errorActive" : "opacity-0"
                  } bg-[#e90b0b] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[55%] text-left lg:text-[.7vw]`}
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

export default NewCard;
