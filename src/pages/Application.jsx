import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/index.css";
import Modal from "../components/Modal";

const Application = () => {
  const [cards, setCards] = useState([]); // todos os flashcards
  const [isModalOpen, setModalOpen] = useState(false); // conferir se o modal está aberto
  const [showInput, setShowInput] = useState(false); // conferir se o input do select está aberto
  const [missingInput, setMissingInput] = useState(false); // conferir se faltou algum input

  // estado para armazenar os valores dos inputs
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
  });

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (
      formData.category == "" ||
      formData.question == "" ||
      formData.answer == ""
    ) {
      return setMissingInput(true);
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

  console.log(cards);

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
              <h2 className="lg:text-[3vw]">Novo Card</h2>
            </div>
            <form
              className="flex items-start justify-center lg:gap-[2vw]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col lg:gap-[1vw] lg:w-[50vw]">
                <div className="flex items-center justify-start lg:gap-[1vw]">
                  <div>
                    <h3 className="text-[#424242] lg:text-[1.6vw]">
                      Categoria
                    </h3>
                  </div>
                  <div className="bg-[#3b45f2] text-[#fff] lg:px-[.8vw] lg:py-[.4vw] lg:rounded-[1.3vw] lg:w-[80%]">
                    <select
                      name="category"
                      id="category"
                      className="border-none outline-none lg:w-[100%]"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="-" className="bg-[#131986] text-[#fff]">
                        -
                      </option>
                      {groupedFlashcards && // verificar se o groupedFlashcards existe para houver a separacao entre categorias
                        Object.keys(groupedFlashcards).map((category) => (
                          <option
                            key={category}
                            value={category}
                            name={category}
                            className="bg-[#131986] text-[#fff]"
                          >
                            {category}
                          </option>
                        ))}

                      <option
                        value="Outro"
                        className="bg-[#5860f0] text-[#fff]"
                      >
                        Outro
                      </option>
                      <option
                        value="Ingles"
                        className="bg-[#5860f0] text-[#fff]"
                      >
                        Ingles
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Escreva sua pergunta"
                    className="resize-none w-[100%] lg:h-[30vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw]"
                  ></textarea>
                </div>
              </div>
              <div className="w-[50vw] ">
                <div>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    placeholder="Escreva sua resposta"
                    className="resize-none w-[100%] lg:h-[30vh] lg:p-[1vw] border-[.2vw] lg:rounded-[1.3vw]"
                  ></textarea>
                </div>
                <div className="flex items-center lg:gap-[1vw]">
                  <button
                    type="submit"
                    className="cursor-pointer bg-[#131986] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[40%] text-left"
                  >
                    Criar Card
                  </button>

                  {missingInput && (
                    <span
                      className={`${
                        missingInput ? "errorActive" : "opacity-0"
                      } bg-[#e90b0b] text-[#fff] lg:px-[1vw] lg:py-[.7vw] lg:rounded-[1.3vw] lg:w-[55%] text-left lg:text-[1.2vw] `}
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
                <h2>{category}</h2>
                <div className="flex flex-wrap">
                  {groupedFlashcards[category].map((flashcard) => (
                    <button
                      key={flashcard.id}
                      className="cursor-pointer lg:m-[1vw] lg:p-[1vw] lg:w-[200px] lg:rounded-[5px] lg:border-[1px] lg:border-[#fff] lg:border-solid"
                    >
                      <h3>{flashcard.question}</h3>
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
