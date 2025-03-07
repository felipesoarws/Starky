import PropTypes from "prop-types";
import Modal from "./Modal";

const ExportDeck = ({
  setSelectedCategories,
  isExportDeckModalOpen,
  setExportDeckModalOpen,
  groupedFlashcards,
  selectedCategories,
  exportDeck,
}) => {
  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((cat) => cat !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  return (
    <div className={`modal-overlay ${isExportDeckModalOpen ? "active" : ""}`}>
      <Modal
        isOpen={isExportDeckModalOpen}
        onClose={() => setExportDeckModalOpen(false)}
        width={"w-[75%] lg:w-[30vw]"}
        bgColor={"blue"}
      >
        <div className="leading-5 mr-5 lg:mr-0 lg:leading-[2.4vw]">
          <div className="mb-4 lg:mb-[1vw]">
            <h2 className="lufga-bold text-[var(--white-gray)] text-2xl lg:text-[2.5vw]">
              Exportar decks
            </h2>
            <p className="lufga-reg text-[var(--white-gray)] text-[1rem] lg:text-[1.5vw]">
              Selecione os decks que você deseja exportar:
            </p>
          </div>

          <div className="flex flex-col gap-2 lg:gap-0 lg:h-[41vh] overflow-auto">
            {Object.keys(groupedFlashcards).map(
              (
                category // object.keys para retornar o array com as propriedades do objeto
              ) => (
                <div key={category}>
                  <div className="flex items-center justify-start gap-4 lg:gap-[1vw] lg:mt-[.5vw]">
                    <div className="checkbox-wrapper-64">
                      <label className="switch">
                        <input
                          name={category}
                          type="checkbox"
                          onChange={() => handleCheckboxChange(category)}
                          checked={selectedCategories.includes(category)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <h2 className="lufga-bold text-[var(--white-gray)]  py-[.4rem] text-[1.1rem] lg:py-[.4vw] lg:text-[1.5vw] lg:translate-y-[-.4vw]">
                      {category}
                    </h2>
                  </div>
                </div>
              )
            )}
          </div>
          <button
            onClick={() => exportDeck()}
            className="text-[var(--white-gray)] bg-[var(--gray-dark)] transition-all ease-in-out duration-[.3s] cursor-pointer p-[.5rem] rounded-[.5rem] text-[.9rem] mt-4 w-[100%] lg:mt-[1vw] lg:p-[.5vw] lg:rounded-[.5vw] lg:text-[1.1vw] hover:bg-[var(--gray-light)]"
          >
            Exportar
          </button>
        </div>
      </Modal>
    </div>
  );
};

ExportDeck.propTypes = {
  setSelectedCategories: PropTypes.func.isRequired,
  setExportDeckModalOpen: PropTypes.func.isRequired,
  isExportDeckModalOpen: PropTypes.bool.isRequired,
  groupedFlashcards: PropTypes.object.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  exportDeck: PropTypes.func.isRequired,
};

export default ExportDeck;
