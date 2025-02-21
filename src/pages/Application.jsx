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

  // avaliar o card
  const [difficulty, setDifficulty] = useState("");

  console.log(difficulty);

  const reviewOptions = [
    {
      option: "De Novo",
      duration: "Agora",
    },
    {
      option: "Fácil",
      duration: "3 dias",
    },
    {
      option: "Médio",
      duration: "15min",
    },
    {
      option: "Dificil",
      duration: "5min",
    },
  ];

  useEffect(() => {
    document.title = "starky | overview";
    const storedItems = JSON.parse(localStorage.getItem("cards")) || [];

    setCards(storedItems);
  }, []);

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
  const [isReviewCardModalOpen, setReviewCardModalOpen] = useState(false); // conferir se o modal de editar o card está aberto
  const openReviewCardModal = () => setReviewCardModalOpen(true);
  const closeReviewCardModal = () => setReviewCardModalOpen(false);

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

    const newCard = {
      id: cards.length + 1,
      category: formData.category,
      question: formData.question,
      answer: formData.answer,
      status: "new",
      creationDate: new Date().toISOString().split("T")[0],
      /* nextReviewDate: new Date().toISOString().split("T")[0], */
      nextReviewDate: "2025-02-28",
    };

    const updatedCards = [...cards, newCard];

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    closeNewCardModal();
    setMissingInput(false);
    cleanForm();
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
    const selectedDeck = cards.filter((card) => card.category == deck);
    setSelectedDeck(selectedDeck);
    openReviewCardModal();
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
              const revisedCards = groupedFlashcards[category].filter(
                (flashcard) => flashcard.status === "reviewed"
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
                        Cards novos
                      </p>
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        <strong className="lg:text-[1.3vw]">
                          {learnedCards}
                        </strong>{" "}
                        {learnedCards > 1
                          ? "Cards aprendidos"
                          : "Card aprendido"}
                      </p>
                      <p className="text-[var(--blue-light)] lg:text-[1vw]">
                        <strong className="lg:text-[1.3vw]">
                          {" "}
                          {revisedCards}
                        </strong>{" "}
                        {revisedCards > 1
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
            closeReviewCardModal={closeReviewCardModal}
            reviewOptions={reviewOptions}
            setDifficulty={setDifficulty}
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
