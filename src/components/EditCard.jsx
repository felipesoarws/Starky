import { Trash, FloppyDisk } from "@phosphor-icons/react";

import Modal from "./Modal";

const EditCard = ({
  isEditCardModalOpen,
  closeEditCardModal,
  handleEditedCardSubmit,
  groupedFlashcards,
  editDeck,
  editedCategory,
  setEditedCategory,
  editedQuestion,
  setEditedQuestion,
  editedAnswer,
  setEditedAnswer,
  selectedEditCard,
  deleteCard,
}) => {
  return (
    <div className={`modal-overlay ${isEditCardModalOpen ? "active" : ""}`}>
      <Modal
        isOpen={isEditCardModalOpen}
        onClose={closeEditCardModal}
        width={"w-[80%] lg:w-[40vw]"}
      >
        <div className="relative flex items-start">
          <h2 className="lufga-bold text-2xl lg:text-[2.5vw]">Editar Cards</h2>
        </div>
        <form
          className="flex items-start justify-center gap-2 mt-[.8rem] lg:gap-[1vw] lg:mt-[1vw]"
          onSubmit={handleEditedCardSubmit}
        >
          <div className="flex flex-col gap-3 w-[100%] lg:gap-[1.5vw] lg:w-[100%] lg:flex-row">
            <div className="bg-[var(--blue-light)] overflow-y-auto overflow-x-hidden flex flex-col items-start justify-start h-[20vh] rounded-[.7rem] text-[1.1rem] w-[100%] lg:w-[15vw] lg:h-[65vh] lg:rounded-[1.3vw] lg:text-[1vw]">
              {Object.keys(groupedFlashcards).map(
                (
                  category // object.keys para retornar o array com as propriedades do objeto
                ) => (
                  <div key={category}>
                    <h2 className="lufga-bold text-[var(--white-gray)] px-2 py-[.4rem] pt-[1rem] text-[1.1rem] lg:px-[1vw] lg:py-[.4vw] lg:pt-[1vw] lg:text-[1.5vw]">
                      {category}
                    </h2>
                    <div className="hidden lg:flex flex-col">
                      {groupedFlashcards[category].map((flashcard) => (
                        <button
                          type="button"
                          key={flashcard.id}
                          onClick={() => editDeck(flashcard)}
                          className="text-[var(--white-gray)] bg-[#ececec25] text-left whitespace-nowrap cursor-pointer border-[var(--blue-midnight)] text-[.9rem] p-1 border-l-[.3rem] overflow-hidden w-[100rem] lg:border-l-[.3vw] lg:w-[15vw] lg:h-[2vw] lg:px-[1.5vw] lg:py-[.4vw] lg:text-[1vw] hover:bg-[#ececec35]"
                        >
                          {flashcard.question.substring(0, 22) + "..."}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-col lg:hidden">
                      {groupedFlashcards[category].map((flashcard) => (
                        <button
                          type="button"
                          key={flashcard.id}
                          onClick={() => editDeck(flashcard)}
                          className="text-[var(--white-gray)] bg-[#ececec25] text-left whitespace-nowrap cursor-pointer border-[var(--blue-midnight)] text-[.9rem] p-1 border-l-[.3rem] overflow-hidden w-[100rem] lg:border-l-[.3vw] lg:w-[15vw] lg:h-[2vw] lg:px-[1.5vw] lg:py-[.4vw] lg:text-[1vw] hover:bg-[#ececec35]"
                        >
                          {flashcard.question.substring(0, 35) + "..."}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col gap-2 lg:gap-[1vw]">
              <div>
                <h2 className="lufga-bold text-[1.1rem] lg:text-[1.2vw]">
                  Categoria
                </h2>
                <textarea
                  name="category"
                  value={
                    editedCategory ? editedCategory : selectedEditCard.category
                  }
                  onChange={(e) => setEditedCategory(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  p-[.8rem] h-[3rem] w-[100%] rounded-[.8rem] text-[.9rem] border-[.15vw] lg:p-[1vw] lg:h-[3vw] lg:w-[18vw] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div>
                <h2 className="lufga-bold text-[1.1rem] lg:text-[1.2vw]">
                  Pergunta
                </h2>
                <textarea
                  name="question"
                  value={
                    editedQuestion ? editedQuestion : selectedEditCard.question
                  }
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  p-[.8rem] h-[3rem] w-[100%] rounded-[.8rem] text-[.9rem] border-[.15vw] lg:p-[1vw] lg:h-[15vh] lg:w-[18vw] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div>
                <h2 className="lufga-bold text-[1.1rem] lg:text-[1.2vw]">
                  Resposta
                </h2>
                <textarea
                  name="answer"
                  value={editedAnswer ? editedAnswer : selectedEditCard.answer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  p-[.8rem] h-[3rem] w-[100%] rounded-[.8rem] text-[.9rem] border-[.15vw] lg:p-[1vw] lg:w-[18vw] lg:h-[15vh] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div className="flex gap-2 lg:gap-[.8vw]">
                <button
                  type="submit"
                  className="flex items-center cursor-pointer bg-[var(--blue-midnight)] transition-all ease-in-out duration-[.3s] text-[#fff] text-left px-[1rem] py-[.5rem] rounded-[1.3rem] w-[100%] text-[1.1rem] gap-[.5rem] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[100%] lg:text-[1.1vw] lg:gap-[.5vw] hover:bg-[var(--blue-light)] "
                >
                  <FloppyDisk size={28} color="#ececec" />
                  Salvar Card
                </button>
                <button
                  type="button"
                  className=" transition-all ease-in-out duration-[.3s] cursor-pointer bg-[var(--red-light)] text-[#fff]  text-left px-[1rem] py-[.5rem] rounded-[1.3rem]  text-[1.1rem] gap-[.5rem] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:text-[1.1vw] lg:gap-[.5vw]hover:bg-[#FF0000]"
                  onClick={() => deleteCard(selectedEditCard)}
                >
                  <Trash size={27} color="#ececec" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditCard;
