import { X } from "@phosphor-icons/react";

const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  openEditCardModal,
  handleButtonClick,
}) => {
  return (
    <div className="z-50 block lg:hidden">
      <div className="relative">
        <nav
          className={`${
            isMobileMenuOpen
              ? "w-[50vw] border-l-[var(--white-gray)] border-l-2"
              : "w-[0vw]"
          } fixed bg-[rgba(99,134,238,0.44)] backdrop-blur-[8.6px] top-0 right-[0vw] bottom-0 z-10 overflow-x-hidden transition-all ease-in-out duration-[.3s]`}
        >
          <div
            className={`${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            } cursor-pointer  absolute right-[1.5rem] top-[1.5rem] transition-all ease-in-out duration-[.3s] `}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={32} color="#ececec" weight="bold" />
          </div>
          <ul className="flex flex-col items-end mt-[4rem] p-[1rem] gap-[.8rem]">
            <li>
              <button
                className={`${
                  isMobileMenuOpen ? "opacity-100" : "opacity-0"
                } cursor-pointer bg-[var(--blue-light)] text-[var(--white-gray)] rounded-[1rem] px-[.8rem] p-[.5rem] w-[40vw] text-[1rem] block transition-all ease-in-out duration-[.3s]  lg:text-[1.1vw] lg:hidden hover:bg-[var(--white-gray)] hover:text-[var(--blue-light)] `}
                onClick={() => {
                  handleButtonClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Importar Decks
              </button>
            </li>
            <li>
              <button
                className={`${
                  isMobileMenuOpen ? "opacity-100" : "opacity-0"
                } cursor-pointer bg-[var(--blue-light)] text-[var(--white-gray)] rounded-[1rem] px-[.8rem] p-[.5rem] w-[40vw] text-[1rem] block transition-all ease-in-out duration-[.3s]  lg:text-[1.1vw] lg:hidden hover:bg-[var(--white-gray)] hover:text-[var(--blue-light)] `}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                Exportar Decks
              </button>
            </li>

            <li>
              <button
                className={`${
                  isMobileMenuOpen ? "opacity-100" : "opacity-0"
                } cursor-pointer bg-[var(--blue-light)] text-[var(--white-gray)] rounded-[1rem] px-[.8rem] p-[.5rem] w-[40vw] text-[1rem] block transition-all ease-in-out duration-[.3s]  lg:text-[1.1vw] lg:hidden hover:bg-[var(--white-gray)] hover:text-[var(--blue-light)] `}
                onClick={() => {
                  openEditCardModal();
                  setIsMobileMenuOpen(false);
                }}
              >
                Editar Cards
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
