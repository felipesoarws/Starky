import { useEffect } from "react";
import Modal from "./Modal";

const ReviewDeck = ({
  selectedDeck,
  isReviewCardModalOpen,
  isDifficultyModalOpen,
  closeReviewCardModal,
  closeDifficultyModal,
  reviewOptions,
  cardDifficulty,
  cardConfirmDifficulty,
  setDifficultyModalOpen,
  setCardDifficulty,
  setConfirmCardDifficulty,
  changeCardDetails,
  setShowAnswer,
  showAnswer,
  getLocalDate,
}) => {
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {}, []);

  // filtrar cards com status de revisão para hoje
  const cardsToReviewToday = selectedDeck.filter((card) => {
    const today = getLocalDate();

    return card.nextReviewDate <= today;
  });

  // mostrar o card mais recente para ser revisado
  const mostRecentCard = cardsToReviewToday.length
    ? cardsToReviewToday.reduce((mostRecentCard, currentCard) => {
        const currentDate = new Date(currentCard.nextReviewDate);
        const mostRecentDate = new Date(mostRecentCard.nextReviewDate);
        return currentDate > mostRecentDate ? currentCard : mostRecentCard;
      })
    : null;

  // função para alternar entre pergunta e resposta
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // função para a selecionar a dificuldade do card
  const difficultySelection = (diff) => {
    setCardDifficulty(diff);
    setDifficultyModalOpen(true);
  };

  const difficultyConfirmation = () => {
    setConfirmCardDifficulty(true);

    if (cardConfirmDifficulty) {
      changeCardDetails(mostRecentCard, cardDifficulty);
      closeDifficultyModal();
      closeReviewCardModal();
      setShowAnswer(false);
      setConfirmCardDifficulty(false);
    }
  };

  return (
    <>
      <div className={`modal-overlay ${isReviewCardModalOpen ? "active" : ""}`}>
        <Modal
          isOpen={isReviewCardModalOpen}
          onClose={closeReviewCardModal}
          width={"lg:w-[52vw]"}
          bgColor={"blue"}
        >
          <div className="lg:leading-[2.4vw]">
            <div className="text-[var(--white-gray)] flex flex-col lg:gap-[2vw]">
              <h1 className="lg:text-[1.5vw]">
                Hoje,{" "}
                <strong className="bg-[var(--white-gray)] text-[var(--blue-light)] lg:px-[.5vw]">
                  dia {formattedDate}
                </strong>
                , você tem{" "}
                <strong className="bg-[var(--white-gray)] text-[var(--blue-light)] lg:px-[.5vw]">
                  {cardsToReviewToday.length}
                </strong>{" "}
                {cardsToReviewToday.length > 1 ? (
                  <>cards para revisar</>
                ) : (
                  <>card para revisar</>
                )}
              </h1>
              <div className="flex items-start justify-between lg:mt-[1vw]">
                <div className="flex flex-col lg:gap-[1vw]">
                  {showAnswer ? (
                    <div
                      className={`deck-item bg-[#ffffff25] text-center overflow-hidden border-[var(--white-gray)] border-[.1vw] flex items-center justify-center border-solid transition-all ease-in-out duration-[.3s] lg:p-[1vw] lg:h-[45vh] lg:w-[22vw]  lg:rounded-[.5vw] ${
                        showAnswer ? "flipped" : ""
                      }`}
                    >
                      <div className="card-face front absolute transition-transform duration-[0.6s] ease-[ease-in-out];">
                        {mostRecentCard ? (
                          <h1 className="lg:text-[2.5vw]">
                            {mostRecentCard.question}
                          </h1>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="card-face back absolute transition-transform duration-[0.6s] ease-[ease-in-out];">
                        {mostRecentCard ? (
                          <h1 className="lg:text-[2.5vw]">
                            {mostRecentCard.answer}
                          </h1>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`deck-item bg-[#ffffff25] text-center overflow-hidden border-[var(--white-gray)] border-[.1vw] flex items-center justify-center border-solid transition-all ease-in-out duration-[.3s] lg:p-[1vw] lg:h-[45vh] lg:w-[48vw]  lg:rounded-[.5vw] ${
                        showAnswer ? "flipped" : ""
                      }`}
                    >
                      <div className="card-face front absolute transition-transform duration-[0.6s] ease-[ease-in-out];">
                        {mostRecentCard ? (
                          <h1 className="lg:text-[2.5vw]">
                            {mostRecentCard.question}
                          </h1>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="card-face back absolute transition-transform duration-[0.6s] ease-[ease-in-out];">
                        {mostRecentCard ? (
                          <h1 className="lg:text-[2.5vw]">
                            {mostRecentCard.answer}
                          </h1>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )}

                  {showAnswer ? (
                    <button
                      onClick={toggleAnswer}
                      className="bg-[var(--blue-cian)] transition-all ease-in-out duration-[.3s] cursor-pointer lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[1.1vw] hover:bg-[var(--blue-midnight)]"
                    >
                      Mostrar Pergunta
                    </button>
                  ) : (
                    <button
                      onClick={toggleAnswer}
                      className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[1.1vw] hover:bg-[var(--gray-light)]"
                    >
                      Mostrar Resposta
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-start justify-start lg:gap-[1vw]">
                  {showAnswer ? (
                    <>
                      <h1 className="lg:text-[2.2vw]">
                        Qual foi a dificuldade?
                      </h1>
                      <div className="flex flex-col items-start lg:gap-[1vw]">
                        {reviewOptions.map((options, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-start lg:gap-[1vw]"
                          >
                            <button
                              className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer lg:p-[.5vw] lg:px-[.8vw] lg:rounded-[.5vw] lg:text-[1.1vw] lg:w-[8vw] hover:bg-[var(--gray-light)]"
                              onClick={() =>
                                difficultySelection(options.option)
                              }
                            >
                              {options.option}
                            </button>
                            <p className="lg:text-[1vw]">{options.duration}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className={`modal-overlay ${isDifficultyModalOpen ? "active" : ""}`}>
        <Modal
          isOpen={isDifficultyModalOpen}
          onClose={closeDifficultyModal}
          width={"lg:w-[30vw]"}
          bgColor={"blue"}
        >
          <div className="text-[var(--white-gray)] flex flex-col items-center justify-center text-center lg:gap-[.5vw] lg:mt-[1.5vw]">
            <p className="lufga-reg lg:text-[1.4vw]">
              Você tem certeza dessa dificuldade?
            </p>
            <p className="lufga-bold lg:text-[3vw] ">{cardDifficulty}</p>
            <div className="flex lg:gap-[.5vw] w-[60%]">
              <button
                className="bg-[var(--red-light)] transition-all ease-in-out duration-[.3s] cursor-pointer w-full lg:p-[.5vw] lg:px-[.8vw] lg:rounded-[.5vw] lg:text-[1.3vw] hover:bg-[red]"
                onClick={closeDifficultyModal}
              >
                Não
              </button>
              <button
                className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer w-full lg:p-[.5vw] lg:px-[.8vw] lg:rounded-[.5vw] lg:text-[1.3vw] hover:bg-[var(--gray-light)]"
                onClick={() => difficultyConfirmation()}
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

export default ReviewDeck;
