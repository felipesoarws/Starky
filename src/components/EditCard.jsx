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
  deleteDeck,
  isDeckRemovalModalOpen,
  setCategoryDeckRemoval,
  setDeckRemovalModalOpen,
  categoryDeckRemoval,
}) => {
  return (
    <>
      <div className={`modal-overlay ${isEditCardModalOpen ? "active" : ""}`}>
        <Modal
          isOpen={isEditCardModalOpen}
          onClose={closeEditCardModal}
          width={"w-[80%] lg:w-[45vw]"}
        >
          <div className="relative flex items-start">
            <h2 className="lufga-bold text-2xl lg:text-[2.5vw]">
              Editar Cards
            </h2>
          </div>
          <form
            className="flex items-start justify-center gap-2 mt-[.8rem] lg:gap-[1vw] lg:mt-[1vw]"
            onSubmit={handleEditedCardSubmit}
          >
            <div className="flex flex-col gap-3 w-[100%] lg:gap-[1.5vw] lg:w-[100%] lg:flex-row">
              <div className="bg-[var(--blue-light)] overflow-y-auto overflow-x-hidden flex flex-col items-start justify-start h-[20vh] rounded-[.7rem] text-[1.1rem] lg:w-[20vw] lg:h-[65vh] lg:rounded-[1.3vw] lg:text-[1vw]">
                {Object.keys(groupedFlashcards).map(
                  (
                    category // object.keys para retornar o array com as propriedades do objeto
                  ) => (
                    <div key={category}>
                      <div className="flex items-center justify-between w-[16rem] lg:w-full">
                        <h2 className="lufga-bold text-[var(--white-gray)] px-2 py-[.4rem] pt-[1rem] text-[1.1rem] lg:px-[1vw] lg:py-[.4vw] lg:pt-[1vw] lg:text-[1.5vw]">
                          {category}
                        </h2>
                        <button
                          type="button"
                          className="z-50 transition-all ease-in-out duration-[.3s] cursor-pointer bg-[var(--red-light)] text-left px-[.4rem] py-[.4rem] rounded-[1.3rem]  text-[1.1rem] gap-[.5rem] lg:px-[.4vw] lg:py-[.4vw] lg:rounded-[1.3vw] lg:text-[1.1vw] lg:gap-[.5vw] lg:mr-[.7vw] hover:bg-[#FF0000]"
                          onClick={() => {
                            setCategoryDeckRemoval(category);
                            setDeckRemovalModalOpen(true);
                          }}
                        >
                          <Trash size={20} color="#ececec" />
                        </button>
                      </div>

                      <div className="hidden lg:flex flex-col">
                        {groupedFlashcards[category].map((flashcard) => (
                          <button
                            type="button"
                            key={flashcard.id}
                            onClick={() => editDeck(flashcard)}
                            className="text-[var(--white-gray)] bg-[#ececec25] text-left whitespace-nowrap cursor-pointer border-[var(--blue-midnight)] text-[.9rem] p-1 border-l-[.3rem] overflow-hidden w-[100rem] lg:border-l-[.3vw] lg:w-[20vw] lg:h-[2vw] lg:px-[1.5vw] lg:py-[.4vw] lg:text-[1vw] hover:bg-[#ececec35]"
                          >
                            {flashcard.question.length > 30
                              ? flashcard.question.substring(0, 31) + "..."
                              : flashcard.question}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-col lg:hidden">
                        {groupedFlashcards[category].map((flashcard) => (
                          <button
                            type="button"
                            key={flashcard.id}
                            onClick={() => editDeck(flashcard)}
                            className="text-[var(--white-gray)] bg-[#ececec25] text-left whitespace-nowrap cursor-pointer border-[var(--blue-midnight)] text-[.9rem] p-1 border-l-[.3rem] overflow-hidden w-[100rem] lg:border-l-[.3vw] lg:w-[20vw] lg:h-[2vw] lg:px-[1.5vw] lg:py-[.4vw] lg:text-[1vw] hover:bg-[#ececec35]"
                          >
                            {flashcard.question.length > 32
                              ? flashcard.question.substring(0, 33) + "..."
                              : flashcard.question}
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
                      editedCategory
                        ? editedCategory
                        : selectedEditCard.category
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
                      editedQuestion
                        ? editedQuestion
                        : selectedEditCard.question
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
                    value={
                      editedAnswer ? editedAnswer : selectedEditCard.answer
                    }
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
      <div
        className={`modal-overlay ${isDeckRemovalModalOpen ? "active" : ""}`}
      >
        <Modal
          isOpen={isDeckRemovalModalOpen}
          onClose={() => setDeckRemovalModalOpen(false)}
          width={"w-[17rem] lg:w-[25vw]"}
          bgColor={"blue"}
        >
          <div className="text-[var(--white-gray)] flex flex-col items-center justify-center text-center gap-[.4rem] mt-4 lg:gap-[.5vw] lg:mt-[1.5vw]">
            <p className="lufga-bold text-[1.2rem] lg:text-[1.4vw] lg:leading-[1.3vw]">
              Você tem certeza que deseja apagar esse deck?
            </p>
            <p className="lufga-reg text-[1.2rem] lg:text-[1.2vw]">
              Todos os cards serão apagados.
            </p>
            <p className="lufga-bold text-3xl lg:text-[2vw] ">
              {categoryDeckRemoval}
            </p>
            <div className="flex gap-3 lg:gap-[.5vw] w-[60%] lg:mt-[.8vw]">
              <button
                className="bg-[var(--red-light)] transition-all ease-in-out duration-[.3s] cursor-pointer w-full p-[.2rem] px-[.8rem] rounded-[.5rem] text-[1.3rem] lg:p-[.5vw] lg:px-[.8vw] lg:rounded-[.5vw] lg:text-[1.3vw] hover:bg-[red]"
                onClick={() => setDeckRemovalModalOpen(false)}
              >
                Não
              </button>
              <button
                className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer w-full p-[.2rem] px-[.8rem] rounded-[.5rem] text-[1.3rem] lg:p-[.5vw] lg:px-[.8vw] lg:rounded-[.5vw] lg:text-[1.3vw] hover:bg-[var(--gray-light)]"
                onClick={() => deleteDeck()}
              >
                Sim
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditCard;
