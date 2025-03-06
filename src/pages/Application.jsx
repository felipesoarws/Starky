import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import AOS from "aos";
import { List, CaretDown } from "@phosphor-icons/react";

// data
import decksThemes from "../../public/data/links.json";

// styles
import "aos/dist/aos.css";
import "../styles/index.css";

// components
import MobileMenu from "../components/MobileMenu";
import NewCard from "../components/NewCard";
import EditCard from "../components/EditCard";
import ReviewDeck from "../components/ReviewDeck";

const Application = () => {
  const [cards, setCards] = useState([]); // todos os flashcards
  const [missingInput, setMissingInput] = useState(false); // conferir se faltou algum input
  const [twoCategories, setTwoCategories] = useState(false); // conferir se duas categorias estao selecionadas
  const [isCardsToReview, setIsCardsToReview] = useState(true); // conferir se não tem nenhum card para revisar hoje
  const [shouldAnimate, setShouldAnimate] = useState(false); // aparecer efeito de notificação do deck
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // conferir se o menu mobile está aberto

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

  // modal para confirmar a remoção do deck
  const [confirmDeckRemoval, setConfirmDeckRemoval] = useState(false);
  const [categoryDeckRemoval, setCategoryDeckRemoval] = useState("");
  const [isDeckRemovalModalOpen, setDeckRemovalModalOpen] = useState(false); // conferir se o modal de editar o card está aberto

  const selectRef = useRef(null);
  const fileInputRef = useRef(null);

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
    if (!isCardsToReview) {
      const timeoutId = setTimeout(() => {
        setShouldAnimate(true);
      }, 200);

      return () => clearTimeout(timeoutId);
    }
  }, [isCardsToReview]);

  useEffect(() => {
    document.title = "starky | overview";
    window.scrollTo({
      top: 0,
    });
    AOS.init();
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
      id: uuidv4(),
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
      answer: editedAnswer || selectedEditCard.answer,
      nextReviewDate: getLocalDate(),
      status: "new",
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
    if (flashcard.length === 0) return;

    const updatedCards = cards.filter((card) => card.id !== flashcard.id);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setSelectedEditCard([]);
    closeEditCardModal();
  };

  // deletar deck
  const deleteDeck = () => {
    setConfirmDeckRemoval(true);
    const filteredDeck = cards.filter((card) => {
      return card.category !== categoryDeckRemoval;
    });

    if (confirmDeckRemoval) {
      setCards(filteredDeck);
      setDeckRemovalModalOpen(false);
      localStorage.setItem("cards", JSON.stringify(filteredDeck));
    }
  };

  useEffect(() => {
    if (cards.length === 0) {
      setEditCardModalOpen(false);
    }
  }, [cards]);

  // revisar Deck
  const revisarDeck = (deck) => {
    setShowAnswer(false);
    const selectedDeck = cards.filter((card) => card.category == deck);

    const isThereCardToReview = selectedDeck.filter(
      (card) => card.status === "new" || card.status === "toReview"
    );

    if (isThereCardToReview.length < 1) {
      return setIsCardsToReview(false);
    }

    setIsCardsToReview(true);
    setSelectedDeck(selectedDeck);
    setShouldAnimate(false);
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

  // importar deck formato .json
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        try {
          const json = JSON.parse(text);
          updateDecks(json);
        } catch (error) {
          console.error("Erro ao imporar o deck:", error);
        } finally {
          event.target.value = "";
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Por favor, selecione um arquivo JSON válido.");
      event.target.value = "";
    }
  };

  // atualizar lista de decks assim que algum for importado

  const updateDecks = (importedDecks) => {
    const newDecks = importedDecks.map((card) => ({
      id: uuidv4(),
      category: card.category,
      question: card.question,
      answer: card.answer,
      status: "new",
      creationDate: getLocalDate(),
      nextReviewDate: getLocalDate(),
    }));

    const allCards = [...cards, ...newDecks];
    setCards(allCards);
    localStorage.setItem("cards", JSON.stringify(allCards));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mx-6 my-6 lg:mx-[3vw] lg:my-[1.5vw]">
      <div className="z-1 fixed rounded-[2rem] backdrop-blur-[8.6px] top-[1.5rem] left-[2rem] right-[2rem] p-[.5rem] px-[1.5rem] bg-[rgba(99,238,238,0.05)] lg:p-[.8vw] lg:px-[1.5vw] lg:rounded-[2vw] lg:top-[1vw] lg:left-[3vw] lg:right-[3vw] ">
        <div className="flex justify-between items-center">
          <h2
            className="lufga-bold lg:text-[1.4vw]"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            <Link to={"/"}>starky.</Link>
          </h2>
          <div className="flex justify-between gap-[1rem] items-center lg:gap-[2.5vw]">
            <div className="flex justify-between gap-[.8rem] items-center lg:gap-[2.5vw]">
              <div data-aos="fade-down" data-aos-duration="1000">
                <input
                  type="file"
                  id="fileInput"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <label htmlFor="fileInput">
                  <button
                    className="cursor-pointer text-[.7rem] hidden lg:text-[1.1vw] lg:block"
                    onClick={handleButtonClick}
                  >
                    Importar Decks
                  </button>
                </label>
              </div>

              <button
                className="cursor-pointer text-[.7rem] hidden lg:text-[1.1vw] lg:block"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                Exportar Decks
              </button>

              <button
                className="cursor-pointer text-[.7rem] hidden lg:text-[1.1vw] lg:block"
                onClick={() => {
                  if (cards.length === 0) return;
                  openEditCardModal();
                }}
                data-aos="fade-down"
                data-aos-duration="2000"
              >
                Editar Cards
              </button>
              <button
                className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[.8rem] px-[.6rem] lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[var(--blue-midnight)]"
                onClick={openNewCardModal}
                data-aos="fade-down"
                data-aos-duration="2500"
              >
                <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[.9rem] lg:text-[1.1vw]">
                  Novo Card
                </h2>
              </button>
              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className="cursor-pointer block lg:hidden"
              >
                <List size={32} color="#ececec" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openEditCardModal={openEditCardModal}
        handleButtonClick={handleButtonClick}
      />

      <main className="mt-25 lg:mt-[6vw] lg:min-h-[72vh]">
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
        <div className="flex flex-col gap-4 lg:gap-[1.5vw] lg:mx-[5vw] ">
          <h1
            className="lufga-bold text-center text-4xl lg:text-[3vw] lg:text-left"
            data-aos="fade-right"
            data-aos-duration="750"
          >
            Seus Decks
          </h1>
          {cards.length < 1 && (
            <div className="text-center lg:leading-[2vw]">
              <h1
                className="lufga-bold text-2xl lg:text-[3vw]"
                data-aos="fade-down"
                data-aos-duration="500"
              >
                Você não tem nenhum deck.
              </h1>
              <h1
                className="lufga-med text-[1.3rem] lg:text-[2vw]"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                Crie seus próprios cards ou importe os seus favoritos.
              </h1>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-center">
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
                  className="deck-item bg-[var(--white-gray)] relative overflow-hidden border-[var(--blue-light)] border-2 m-2 p-4 w-[20rem] h-[10rem] rounded-2xl flex flex-col justify-between border-solid transition-all ease-in-out duration-[.3s] lg:m-[1vw] lg:p-[1vw] lg:w-[25vw] lg:h-[13vw] lg:border-[.1vw]  lg:rounded-[.5vw] hover:bg-[#ffffff85]"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                >
                  <h2 className="lufga-bold text-[var(--blue-light)] text-2xl lg:text-[1.8vw]">
                    {category}
                  </h2>
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                      <p className="text-[var(--blue-light)] text-[.9rem] lg:text-[1vw]">
                        <strong className="text-[1rem] lg:text-[1.3vw]">
                          {" "}
                          {newCards}
                        </strong>{" "}
                        {newCards > 1 ? "Cards novos" : "Card novo"}
                      </p>
                      <p className="text-[var(--blue-light)] text-[.9rem] lg:text-[1vw]">
                        <strong className="text-[1rem] lg:text-[1.3vw]">
                          {learnedCards}
                        </strong>{" "}
                        {learnedCards > 1 ? "Cards revisados" : "Card revisado"}
                      </p>
                      <p className="text-[var(--blue-light)] text-[.9rem] lg:text-[1vw]">
                        <strong className="text-[1rem] lg:text-[1.3vw]">
                          {" "}
                          {cardsToReview}
                        </strong>{" "}
                        {cardsToReview > 1
                          ? "Cards para revisar"
                          : "Card para revisar"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end lg:leading-[2.8vw] lg:translate-y-[.7vw]">
                      <strong className="text-[var(--blue-light)] text-5xl lg:text-[4vw]">
                        {totalCards}
                      </strong>
                      <p className="text-[var(--blue-light)] text-[.9rem] lg:text-[1vw]">
                        {totalCards > 1 ? "Cards" : "Card"}
                      </p>
                    </div>
                  </div>
                  <button
                    className="bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer z-40 absolute top-[.8vw] right-[.8vw] p-[.3rem] px-[.8rem]  rounded-[.8rem] text-[.9rem] lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[1.1vw] lg:left-[.8vw] lg:bottom-[.8vw] lg:top-auto hover:bg-[var(--gray-light)]"
                    onClick={() => revisarDeck(category)}
                  >
                    Revisar Deck
                  </button>
                </div>
              );
            })}

            {!isCardsToReview && (
              <div
                className={`select-none  bg-[var(--white-gray)] absolute right-[1rem] bottom-0 left-[1rem] border-[var(--blue-midnight)] border-[.1vw] flex items-center justify-center border-solid transition-all ease-in-out duration-[.4s] m-[1rem] p-[1rem] h-[4rem] rounded-[.5rem] gap-[.8rem] lg:m-[1vw] lg:p-[1vw] lg:h-[4vw] lg:rounded-[.5vw] lg:gap-[.8vw] lg:bottom-0 lg:left-0 lg:right-auto ${
                  shouldAnimate
                    ? "translate-y-0vw"
                    : "translate-y-[6rem] lg:translate-y-[6vw]"
                } `}
              >
                <div className="flex flex-col items-start justify-center">
                  <p className="lufga-bold text-[var(--gray-dark)] text-[.9rem] lg:text-[.9vw]">
                    Não foi possível revisar o deck
                  </p>
                  <p className="text-[var(--gray-dark)] text-[.8rem] lg:text-[.8vw]">
                    Você não tem cards para revisar hoje
                  </p>
                </div>
                <div>
                  <button
                    className="bg-[var(--blue-midnight)] transition-all ease-in-out duration-[.3s] cursor-pointer p-[.4rem] rounded-[.5rem] text-[1rem] lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[.8vw] hover:bg-[var(--blue-light)]"
                    onClick={() => {
                      setShouldAnimate(false);
                      setIsCardsToReview(true);
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
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
            deleteDeck={deleteDeck}
            isDeckRemovalModalOpen={isDeckRemovalModalOpen}
            setDeckRemovalModalOpen={setDeckRemovalModalOpen}
            setCategoryDeckRemoval={setCategoryDeckRemoval}
            categoryDeckRemoval={categoryDeckRemoval}
          />
        </div>
      </main>
      <Content decksThemes={decksThemes} CaretDown={CaretDown} />
    </div>
  );
};

export default Application;

const Content = ({ CaretDown, decksThemes }) => {
  const [isSectionHidden, setSectionHidden] = useState(false);

  if (isSectionHidden) {
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <div className="my-8 lg:my-[1.6vw] lg:mx-[3vw]">
      <div className="flex items-center justify-center gap-2 lg:gap-[.5vw] lg:justify-between">
        <h2 className="lufga-bold text-center text-[1.5rem] lg:text-[1.5vw] lg:text-left">
          Decks prontos
        </h2>
        <span className="bg-[#ffffff73] block h-[.1vw] lg:w-[80%]"></span>
        <button
          className={`${
            isSectionHidden ? "rotate-180" : "rotate-0"
          } cursor-pointer transition-all ease-in-out duration-[.3s] hover:scale-115`}
          onClick={() => setSectionHidden(!isSectionHidden)}
        >
          <CaretDown size={30} color="#ececec" weight="bold" />
        </button>
      </div>
      <div className="flex items-top justify-between flex-col gap-[3rem] lg:flex-row lg:gap-[2vw] lg:mt-[1vw]">
        <div
          className={`${
            isSectionHidden
              ? "scale-y-0 opacity-0 h-[0vh]"
              : "opacity-100 lg:h-[100%]"
          }  transition-all ease-in-out duration-[.4s] text-center opacity-1 flex flex-col gap-[1rem] mt-2 lg:gap-[1.3vw] lg:mt-[1vw] lg:text-left`}
        >
          <h2
            className="text-[1.5rem] m-2 leading-7 lg:text-[2.5vw] lg:w-[35vw] lg:mb-[2vw] lg:leading-[2.5vw]"
            data-aos="fade-down"
            data-aos-duration="750"
          >
            Baixe decks personalizados do seu tema preferido!
          </h2>
          <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-[2vw]">
            {decksThemes.map((theme, id) => (
              <div
                key={id}
                className="bg-[var(--white-gray)] p-[1rem]  rounded-[1rem] w-[21rem] lg:p-[1.5vw]  lg:rounded-[1vw] lg:w-[20vw]"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <div className="mb-4 lg:mb-[.8vw]">
                  <h2 className="lufga-bold text-[1rem] lg:text-[1.5vw] text-[var(--blue-light)]">
                    {theme.category}
                  </h2>
                  <p className="text-[var(--gray-dark)] text-[1rem] lg:text-[.9vw]">
                    {theme.description}
                  </p>
                </div>
                <button className="bg-[var(--blue-light)] transition-all ease-in-out duration-[.3s] cursor-pointer p-[.4rem] rounded-[.5rem] text-[1rem] lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[.8vw] w-full hover:bg-[var(--blue-midnight)]">
                  <a href={theme.file} download>
                    Baixar Deck
                  </a>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
