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
      <Modal isOpen={isEditCardModalOpen} onClose={closeEditCardModal}>
        <div className="relative flex items-start">
          <h2 className="lufga-bold lg:text-[2.5vw]">Editar Cards</h2>
        </div>
        <form
          className="flex items-start justify-center lg:gap-[1vw] lg:mt-[1vw]"
          onSubmit={handleEditedCardSubmit}
        >
          <div className="flex lg:gap-[1.5vw] lg:w-[100%]">
            <div className="bg-[var(--blue-light)] overflow-y-auto overflow-x-hidden flex flex-col items-start justify-start lg:w-[15vw] lg:h-[65vh] lg:rounded-[1.3vw] lg:text-[1vw]">
              {Object.keys(groupedFlashcards).map(
                (
                  category // object.keys para retornar o array com as propriedades do objeto
                ) => (
                  <div key={category}>
                    <h2 className="lufga-bold text-[var(--white-gray)] lg:px-[1vw] lg:py-[.4vw] lg:pt-[1vw] lg:text-[1.5vw]">
                      {category}
                    </h2>
                    <div className="flex flex-col">
                      {groupedFlashcards[category].map((flashcard) => (
                        <button
                          type="button"
                          key={flashcard.id}
                          onClick={() => editDeck(flashcard)}
                          className="text-[var(--white-gray)] bg-[#ececec25] text-left cursor-pointer border-[var(--blue-midnight)] border-l-[.3vw] lg:w-[15vw] lg:px-[1.5vw] lg:py-[.4vw] hover:bg-[#ececec35]"
                        >
                          {flashcard.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col lg:gap-[1vw]">
              <div>
                <h2 className="lufga-bold lg:text-[1.2vw]">Categoria</h2>
                <textarea
                  name="category"
                  value={
                    editedCategory ? editedCategory : selectedEditCard.category
                  }
                  onChange={(e) => setEditedCategory(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  border-[.15vw] lg:p-[1vw] lg:h-[3vw] lg:w-[18vw] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div>
                <h2 className="lufga-bold lg:text-[1.2vw]">Pergunta</h2>
                <textarea
                  name="question"
                  value={
                    editedQuestion ? editedQuestion : selectedEditCard.question
                  }
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  border-[.15vw] lg:p-[1vw] lg:w-[18vw] lg:h-[15vh] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div>
                <h2 className="lufga-bold lg:text-[1.2vw]">Resposta</h2>
                <textarea
                  name="answer"
                  value={editedAnswer ? editedAnswer : selectedEditCard.answer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="resize-none bg-[var(--white-gray)] border-[var(--gray-dark)]  border-[.15vw] lg:p-[1vw] lg:w-[18vw] lg:h-[15vh] lg:rounded-[1.3vw] lg:text-[.9vw]"
                ></textarea>
              </div>
              <div className="flex lg:gap-[.8vw]">
                <button
                  type="submit"
                  className="flex cursor-pointer bg-[var(--blue-midnight)] transition-all ease-in-out duration-[.3s] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[100%] text-left lg:text-[1.1vw] lg:gap-[.5vw] hover:bg-[var(--blue-light)] "
                >
                  <FloppyDisk size={32} color="#ececec" />
                  Salvar Card
                </button>
                <button
                  type="button"
                  className=" transition-all ease-in-out duration-[.3s] cursor-pointer bg-[var(--red-light)] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw]  text-left lg:text-[1.1vw] hover:bg-[#FF0000]"
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
