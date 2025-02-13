import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../styles/index.css";
import Modal from "../components/Modal";

const Application = () => {
  const [cards, setCards] = useState([]); // todos os flashcards
  const [isModalOpen, setModalOpen] = useState(false); // conferir se o modal está aberto
  const [missingInput, setMissingInput] = useState(false); // conferir se faltou algum input
  const [twoCategories, setTwoCategories] = useState(false); // conferir se duas categorias estao selecionadas

  // criação de nova categoria
  const [newCategory, setNewCategory] = useState("");

  // estado para armazenar os valores dos inputs
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
  });

  const selectRef = useRef(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    document.title = "starky | overview";
    const storedItems = JSON.parse(localStorage.getItem("cards")) || [];

    setCards(storedItems);
  }, []);

  // atualizar o estado enquando o usuario digita nos inputs
  const handleInputChange = (e) => {
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

  const handleSubmit = (e) => {
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
    };

    const updatedCards = [...cards, newCard];

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    closeModal();
    setMissingInput(false);
    cleanForm();
  };

  return (
    <div className="mx-6 my-6 lg:mx-[3vw] lg:my-[1.5vw]">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="lufga-bold lg:text-[1.4vw]">
            <Link to={"/"}>starky.</Link>
          </h2>
          <div className="flex justify-between gap-[1rem] items-center lg:gap-[2.5vw]">
            <button className="cursor-pointer text-[.8rem] lg:text-[1.1vw]">
              Editar Decks
            </button>
            <button
              className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[.8rem] px-[.6rem] lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[#131986]"
              onClick={openModal}
            >
              <h2 className="text-[#3b45f2] transition-all duration-[.3s] ease-in-out text-[.8rem] lg:text-[1.1vw]">
                Novo Card
              </h2>
            </button>
          </div>
        </div>
      </div>

      <main className="lg:mt-[3vw]">
        <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="relative flex items-start">
              <h2 className=" lg:text-[3vw]">Novo Card</h2>
            </div>
            <form
              className="flex items-start justify-center lg:gap-[2vw]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col lg:gap-[.8vw] lg:w-[50vw]">
                <div className="flex items-center justify-start lg:gap-[1vw]">
                  <div>
                    <h3 className="text-[#424242] lg:text-[1.1vw] lg:w-[12vw]">
                      Categorias existentes
                    </h3>
                  </div>
                  <div className="bg-[#3b45f2] text-[#fff] lg:px-[.8vw] lg:py-[.4vw] lg:rounded-[1.3vw] lg:w-[100%] flex lg:gap-[1vw]">
                    <select
                      name="category"
                      id="category"
                      className="border-none outline-none lg:w-[100%] lg:text-[1vw]"
                      value={formData.category}
                      onChange={handleInputChange}
                      ref={selectRef}
                    >
                      <option
                        value=""
                        className="bg-[#131986] text-[#fff] lg:text-[1vw]"
                      >
                        -
                      </option>
                      {groupedFlashcards && // verificar se o groupedFlashcards existe para houver a separacao entre categorias
                        Object.keys(groupedFlashcards).map((category) => (
                          <option
                            key={category}
                            value={category}
                            name={category}
                            className="bg-[#131986] text-[#fff] lg:text-[1vw]"
                          >
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-start lg:gap-[1vw]">
                  <div>
                    <h3 className="text-[#424242] lg:text-[1.1vw] lg:w-[9vw]">
                      Nova categoria:
                    </h3>
                  </div>
                  <div className="lg:w-[100%]">
                    <input
                      type="text"
                      className="bg-[#ececec] text-[#3b45f2] border-[#3b45f2] outline-none lg:border-[0.2vw] lg:px-[.8vw] lg:py-[.2vw] lg:rounded-[1.3vw] lg:w-[100%] lg:gap-[1vw]"
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
                    onChange={handleInputChange}
                    placeholder="Escreva sua pergunta"
                    className="resize-none w-[100%] lg:h-[30vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw] lg:text-[1vw]"
                  ></textarea>
                </div>
              </div>
              <div className="w-[50vw] flex flex-col lg:gap-[.5vw]">
                <div>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    placeholder="Escreva sua resposta"
                    className="resize-none w-[100%] lg:h-[33.2vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw] lg:text-[1vw]"
                  ></textarea>
                </div>
                <div className="flex items-center lg:gap-[1vw]">
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#131986] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[40%] text-left lg:text-[1.1vw]"
                  >
                    Criar Card
                  </button>

                  {twoCategories && (
                    <span
                      className={`${
                        missingInput ? "errorActive" : "opacity-0"
                      } bg-[#e90b0b] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[60%] text-left lg:text-[1vw]`}
                    >
                      Selecione somente uma categoria.
                    </span>
                  )}

                  {!twoCategories && missingInput && (
                    <span
                      className={`${
                        missingInput ? "errorActive" : "opacity-0"
                      } bg-[#e90b0b] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[60%] text-left lg:text-[1vw]`}
                    >
                      Preencha todos os campos.
                    </span>
                  )}
                </div>
              </div>
            </form>
          </Modal>
        </div>
        <div className="flex flex-col lg:gap-[2vw]">
          {Object.keys(groupedFlashcards).map(
            (
              category // object.keys para retornar o array com as propriedades do objeto
            ) => (
              <div key={category}>
                <h2 className="lg:text-[3vw]">{category}</h2>
                <div className="flex flex-wrap">
                  {groupedFlashcards[category].map((flashcard) => (
                    <button
                      key={flashcard.id}
                      className="cursor-pointer lg:m-[1vw] lg:p-[1vw] lg:w-[15vw] lg:h-[15vw] lg:rounded-[.5vw] lg:border-[.1vw] lg:border-[#fff] lg:border-solid"
                    >
                      <h3 className="lg:text-[1vw]">{flashcard.question}</h3>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Application;
