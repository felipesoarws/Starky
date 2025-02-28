import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../styles/index.css";

// components
import NewCard from "../components/NewCard";
import EditCard from "../components/EditCard";
import ReviewDeck from "../components/ReviewDeck";

const Application = () => {
  const [cards, setCards] = useState([]); // todos os flashcards
  const [missingInput, setMissingInput] = useState(false); // conferir se faltou algum input
  const [twoCategories, setTwoCategories] = useState(false); // conferir se duas categorias estao selecionadas
  const selectRef = useRef(null);

  // criação de nova categoria
  const [newCategory, setNewCategory] = useState("");

  // estado para armazenar os valores dos inputs
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
    status: "",
  });

  // editar card
  const [selectedEditCard, setSelectedEditCard] = useState([]);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  const reviewOptions = [
    {
      option: "De Novo",
      duration: "Rever agora",
    },
    {
      option: "Dificil",
      duration: "Rever em 5min",
    },
    {
      option: "Médio",
      duration: "Rever em 15min",
    },
    {
      option: "Fácil",
      duration: "Rever em 3 dias",
    },
  ];

  useEffect(() => {
    document.title = "starky | overview";
    const storedItems = JSON.parse(localStorage.getItem("cards")) || [];

    setCards(storedItems);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkStatusCard();
    }, 5000);

    return () => clearInterval(interval);
  }, [cards]);

  const checkStatusCard = () => {
    const today = getLocalDate();

    const updatedCards = cards.map((card) => {
      if (card.status === "learned" && card.nextReviewDate <= today) {
        return { ...card, status: "toReview" };
      }
      return card;
    });

    if (JSON.stringify(updatedCards) !== JSON.stringify(cards)) {
      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    }
  };

  // data de hoje
  const getLocalDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  // modal de criar novo card
  const [isNewCardModalOpen, setNewCardModalOpen] = useState(false); // conferir se o modal de criar novo card está aberto
  const openNewCardModal = () => setNewCardModalOpen(true);
  const closeNewCardModal = () => {
    setNewCardModalOpen(false);
    cleanForm();
  };

  // modal de editar o card
  const [selectedDeck, setSelectedDeck] = useState([]); // deck selecionado para revisão
  const [isEditCardModalOpen, setEditCardModalOpen] = useState(false); // conferir se o modal de editar o card está aberto
  const openEditCardModal = () => setEditCardModalOpen(true);
  const closeEditCardModal = () => {
    setSelectedEditCard([]);
    setEditCardModalOpen(false);
  };

  // modal de revisar o deck
  const [showAnswer, setShowAnswer] = useState(false); // estado para mostrar se a resposta está aparecendo
  const [isReviewCardModalOpen, setReviewCardModalOpen] = useState(false); // conferir se o modal de editar o card está aberto
  const openReviewCardModal = () => setReviewCardModalOpen(true);
  const closeReviewCardModal = () => setReviewCardModalOpen(false);

  // modal para confirmar a opção de dificuldade
  const [cardConfirmDifficulty, setConfirmCardDifficulty] = useState(false);
  const [cardDifficulty, setCardDifficulty] = useState("");
  const [isDifficultyModalOpen, setDifficultyModalOpen] = useState(false); // conferir se o modal de editar o card está aberto
  const closeDifficultyModal = () => setDifficultyModalOpen(false);

  // atualizar o estado enquando o usuario digita nos inputs
  const handleNewCardInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (
      (formData.category != "") &
      (formData.question != "") &
      (formData.answer != "")
    ) {
      setMissingInput(false);
    }
  };

  // atualizar o estado da nova categoria digitada
  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  // agrupar os cards por categoria
  const groupByCategory = (flashcards) => {
    if (!Array.isArray(flashcards)) {
      return {}; // retorna um objeto vazio se não for um array
    }

    if (flashcards.length > 0) {
      return flashcards.reduce((acc, flashcard) => {
        // reduce para acumular elementos do array em um unico valor | acc = acumulador
        const { category } = flashcard; // vai passar em cada flashcard e retornar o param 'category'

        if (!acc[category]) {
          acc[category] = []; // verificando que se o flashcard nao tiver uma categoria das quais ja existe, é criado uma, por exemplo: acc["ingles" = []]
        }

        acc[category].push(flashcard); // adicionando o flash dentro da categoria correspondente
        return acc; // dps de todas as iterações, é retornado o objeto agrupado
      }, {});
    }

    return {}; // retorna um objeto vazio se o flashcards estiver vazio
  };

  const groupedFlashcards = groupByCategory(cards); // organiza os cards por categoria

  // limpar dados do form
  const cleanForm = () => {
    setFormData({
      id: "",
      question: "",
      answer: "",
      category: "",
    });

    setNewCategory("");
  };

  const handleNewCardSubmit = (e) => {
    e.preventDefault();

    if (newCategory.length > 0 && selectRef.current.value.length > 0) {
      return setTwoCategories(true);
    }

    setTwoCategories(false);

    formData.category = newCategory !== "" ? newCategory : formData.category;

    if (
      formData.category == "" ||
      formData.question == "" ||
      formData.answer == "" ||
      formData.category == "-"
    ) {
      return setMissingInput(true); // retornar aviso de erro caso algum input esteja em branco
    }

    const date = new Date();
    const dT = date.getDate();
    const mT = date.getMonth() + 1;
    const yT = date.getFullYear();
    const mmT = date.getMinutes();
    const hhT = date.getHours();

    const newCard = {
      id: cards.length + 1,
      category: formData.category,
      question: formData.question,
      answer: formData.answer,
      status: "new",
      creationDate: createCustomReviewDate()
        .setDay(dT)
        .setMonth(mT)
        .setYear(yT)
        .setHours(hhT)
        .setMinutes(mmT)
        .getLocalISODate(),
      nextReviewDate: createCustomReviewDate()
        .setDay(dT)
        .setMonth(mT)
        .setYear(yT)
        .setHours(hhT)
        .setMinutes(mmT)
        .getLocalISODate(),
    };

    const updatedCards = [...cards, newCard];

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    closeNewCardModal();
    setMissingInput(false);
    cleanForm();
  };

  const createCustomReviewDate = () => {
    const currentDate = new Date();

    return {
      // ajustar os minutos
      setMinutes: function (minutes) {
        const newDate = new Date(currentDate); // Cria uma cópia
        newDate.setMinutes(minutes);
        return this._updateDate(newDate); // Atualiza a data atual
      },

      // ajustar as horas
      setHours: function (hours) {
        const newDate = new Date(currentDate); // Cria uma cópia
        newDate.setHours(hours);
        return this._updateDate(newDate); // Atualiza a data atual
      },

      // ajustar o dia
      setDay: function (day) {
        const newDate = new Date(currentDate); // Cria uma cópia
        newDate.setDate(day);
        return this._updateDate(newDate); // Atualiza a data atual
      },

      // ajustar o mês
      setMonth: function (month) {
        const newDate = new Date(currentDate); // Cria uma cópia
        newDate.setMonth(month - 1); // Mês é base 0 no JavaScript
        return this._updateDate(newDate); // Atualiza a data atual
      },

      // ajustar o ano
      setYear: function (year) {
        const newDate = new Date(currentDate); // Cria uma cópia
        newDate.setFullYear(year);
        return this._updateDate(newDate); // Atualiza a data atual
      },

      // Método interno para atualizar a data atual
      _updateDate: function (newDate) {
        currentDate.setTime(newDate.getTime()); // Atualiza a data atual
        return this;
      },

      // obter a data formatada como string
      getFormattedDate: function () {
        // verifica se a data é válida
        if (isNaN(currentDate.getTime())) {
          throw new Error("Data inválida");
        }

        // Retorna a data formatada
        return currentDate.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },

      // data iso no fuso horário local
      getLocalISODate: function () {
        // verifica se a data é válida
        if (isNaN(currentDate.getTime())) {
          throw new Error("Data inválida");
        }

        // extrai os componentes da data no fuso horário local
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Mês é base 0
        const day = String(currentDate.getDate()).padStart(2, "0");
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");

        // retorna a data no formato ISO, mas com o fuso horário local
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      },
    };
  };

  // enviar dados atualizados dos cards
  const handleEditedCardSubmit = (e) => {
    e.preventDefault();

    const updatedCard = {
      ...selectedEditCard,
      category: editedCategory || selectedEditCard.category,
      question: editedQuestion || selectedEditCard.question,
      answer: editedAnswer || selectedEditCard.question,
    };

    setCards((prevCards) => {
      const newCards = prevCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );

      localStorage.setItem("cards", JSON.stringify(newCards));

      return newCards;
    });

    closeEditCardModal();
    setEditedCategory("");
    setEditedQuestion("");
    setEditedAnswer("");
    setSelectedEditCard([]);
  };

  // editar card em especifico
  const editDeck = (flashcard) => {
    setSelectedEditCard(flashcard);
  };

  // deletar card
  const deleteCard = (flashcard) => {
    const updatedCards = cards.filter((card) => card.id !== flashcard.id);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setSelectedEditCard([]);
    closeEditCardModal();
  };

  // revisar Deck
  const revisarDeck = (deck) => {
    setShowAnswer(false);
    const selectedDeck = cards.filter((card) => card.category == deck);

    const isThereCardToReview = selectedDeck.filter(
      (card) => card.status === "new" || card.status === "toReview"
    );

    if (isThereCardToReview.length < 1) {
      return;
    }

    // criar modal avisando que não tem cards novos para revisar hoje
    // ...

    setSelectedDeck(selectedDeck);
    openReviewCardModal();
  };

  // alterar status do card depois de revisado
  const changeCardDetails = (reviewedCard, difficulty) => {
    const newCard = {
      id: reviewedCard.id,
      category: reviewedCard.category,
      question: reviewedCard.question,
      answer: reviewedCard.answer,
      status: "learned",
      creationDate: reviewedCard.creationDate,
      nextReviewDate: changeNextReviewDate(difficulty),
    };

    setCards((prevCards) => {
      const newCards = prevCards.map((card) =>
        card.id === newCard.id ? newCard : card
      );

      localStorage.setItem("cards", JSON.stringify(newCards));

      return newCards;
    });
  };

  // alterar data de revisao depois de confirmar dificuldade
  const changeNextReviewDate = (difficulty) => {
    const dateObj = new Date();

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    if (difficulty === "De Novo") {
      const newYear = year;
      const newMonth = month === 12 ? 1 : month;
      const newDay = day;
      const newHours = hours;
      const newMinutes = minutes + 1;
      const newSeconds = seconds;

      const newDateObj = new Date(
        newYear,
        newMonth - 1,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      const NewReviewDate = changeDateFormat(
        newDateObj,
        newYear,
        newMonth,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      return NewReviewDate;
    }

    if (difficulty === "Dificil") {
      const newYear = year;
      const newMonth = month === 12 ? 1 : month;
      const newDay = day;
      const newHours = hours;
      const newMinutes = minutes + 5;
      const newSeconds = seconds;

      const newDateObj = new Date(
        newYear,
        newMonth - 1,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      const NewReviewDate = changeDateFormat(
        newDateObj,
        newYear,
        newMonth,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      return NewReviewDate;
    }

    if (difficulty === "Médio") {
      const newYear = year;
      const newMonth = month === 12 ? 1 : month;
      const newDay = day;
      const newHours = hours;
      const newMinutes = minutes + 15;
      const newSeconds = seconds;

      const newDateObj = new Date(
        newYear,
        newMonth - 1,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      const NewReviewDate = changeDateFormat(
        newDateObj,
        newYear,
        newMonth,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      return NewReviewDate;
    }

    if (difficulty === "Fácil") {
      const newYear = year;
      const newMonth = month === 12 ? 1 : month;
      const newDay = day + 3;
      const newHours = hours;
      const newMinutes = minutes;
      const newSeconds = seconds;

      const newDateObj = new Date(
        newYear,
        newMonth - 1,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      const NewReviewDate = changeDateFormat(
        newDateObj,
        newYear,
        newMonth,
        newDay,
        newHours,
        newMinutes,
        newSeconds
      );

      return NewReviewDate;
    }
  };

  // formatar dados de data para padrao 2025-00-00T00:00:00
  const changeDateFormat = (date, y, m, d, hh, mm, ss) => {
    y = date.getFullYear();
    m = String(date.getMonth() + 1).padStart(2, "0");
    d = String(date.getDate()).padStart(2, "0");
    hh = String(date.getHours()).padStart(2, "0");
    mm = String(date.getMinutes()).padStart(2, "0");
    ss = String(date.getSeconds()).padStart(2, "0");

    return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
  };

  return (
    <div className="mx-6 my-6 lg:mx-[3vw] lg:my-[1.5vw]">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="lufga-bold lg:text-[1.4vw]">
            <Link to={"/"}>starky.</Link>
          </h2>
          <div className="flex justify-between gap-[1rem] items-center lg:gap-[2.5vw]">
            <button
              className="cursor-pointer text-[.8rem] lg:text-[1.1vw]"
              onClick={openEditCardModal}
            >
              Editar Cards
            </button>
            <button
              className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[.8rem] px-[.6rem] lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[var(--blue-midnight)]"
              onClick={openNewCardModal}
            >
              <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[.8rem] lg:text-[1.1vw]">
                Novo Card
              </h2>
            </button>
          </div>
        </div>
      </div>

      <main className="lg:mt-[3vw]">
        <NewCard
          isNewCardModalOpen={isNewCardModalOpen}
          closeNewCardModal={closeNewCardModal}
          formData={formData}
          newCategory={newCategory}
          missingInput={missingInput}
          twoCategories={twoCategories}
          selectRef={selectRef}
          groupedFlashcards={groupedFlashcards}
          handleNewCardInputChange={handleNewCardInputChange}
          handleNewCategoryChange={handleNewCategoryChange}
          handleNewCardSubmit={handleNewCardSubmit}
        />
        <div className="flex flex-col lg:gap-[1.5vw] lg:mx-[5vw] ">
          <h1 className="lufga-bold lg:text-[3.5vw]">Seus Decks</h1>
          <div className="flex flex-wrap">
            {Object.keys(groupedFlashcards).map((category) => {
              const totalCards = groupedFlashcards[category].filter(
                (flashcard) => flashcard
              ).length;
              const newCards = groupedFlashcards[category].filter(
                (flashcard) => flashcard.status === "new"
              ).length;
              const learnedCards = groupedFlashcards[category].filter(
                (flashcard) => flashcard.status === "learned"
              ).length;
              const cardsToReview = groupedFlashcards[category].filter(
                (flashcard) =>
                  flashcard.status === "new" || flashcard.status === "toReview"
              ).length;

              return (
                <div
                  key={category}
                  className="deck-item bg-[var(--white-gray)] relative overflow-hidden border-[var(--blue-light)] border-[.1vw] flex flex-col justify-between border-solid transition-all ease-in-out duration-[.3s] lg:m-[1vw] lg:p-[1vw] lg:w-[25vw] lg:h-[13vw] lg:rounded-[.5vw] hover:bg-[#ffffff85]"
                >
                  <h2 className="lufga-bold text-[var(--blue-light)] lg:text-[2.5vw]">
                    {category}
                  </h2>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        <strong className="lg:text-[1.3vw]"> {newCards}</strong>{" "}
                        {newCards > 1 ? "Cards novos" : "Card novo"}
                      </p>
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        <strong className="lg:text-[1.3vw]">
                          {learnedCards}
                        </strong>{" "}
                        {learnedCards > 1 ? "Cards revisados" : "Card revisado"}
                      </p>
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        <strong className="lg:text-[1.3vw]">
                          {" "}
                          {cardsToReview}
                        </strong>{" "}
                        {cardsToReview > 1
                          ? "Cards para revisar"
                          : "Card para revisar"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end lg:leading-[2.8vw] lg:translate-y-[.7vw]">
                      <strong className="text-[var(--blue-light)] lg:text-[4vw]">
                        {totalCards}
                      </strong>
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        {totalCards > 1 ? "Cards" : "Card"}
                      </p>
                    </div>
                  </div>
                  <button
                    className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer z-40 absolute bottom-[.8vw] lg:left-[.8vw] lg:right-[.8vw] lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[1.1vw] hover:bg-[var(--gray-light)]"
                    onClick={() => revisarDeck(category)}
                  >
                    Revisar Deck
                  </button>
                </div>
              );
            })}
          </div>
          <ReviewDeck
            selectedDeck={selectedDeck}
            isReviewCardModalOpen={isReviewCardModalOpen}
            isDifficultyModalOpen={isDifficultyModalOpen}
            closeReviewCardModal={closeReviewCardModal}
            closeDifficultyModal={closeDifficultyModal}
            reviewOptions={reviewOptions}
            setDifficultyModalOpen={setDifficultyModalOpen}
            setCardDifficulty={setCardDifficulty}
            cardDifficulty={cardDifficulty}
            setConfirmCardDifficulty={setConfirmCardDifficulty}
            cardConfirmDifficulty={cardConfirmDifficulty}
            changeCardDetails={changeCardDetails}
            setShowAnswer={setShowAnswer}
            showAnswer={showAnswer}
            getLocalDate={getLocalDate}
          />
          <EditCard
            selectedEditCard={selectedEditCard}
            isEditCardModalOpen={isEditCardModalOpen}
            closeEditCardModal={closeEditCardModal}
            handleEditedCardSubmit={handleEditedCardSubmit}
            groupedFlashcards={groupedFlashcards}
            editDeck={editDeck}
            editedCategory={editedCategory}
            setEditedCategory={setEditedCategory}
            editedQuestion={editedQuestion}
            setEditedQuestion={setEditedQuestion}
            editedAnswer={editedAnswer}
            setEditedAnswer={setEditedAnswer}
            deleteCard={deleteCard}
          />
        </div>
      </main>
    </div>
  );
};

export default Application;
