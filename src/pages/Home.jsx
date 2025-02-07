import "../styles/fonts.css";

const Home = () => {
  return (
    <div className="lg:mx-[3vw] lg:my-[1.5vw]">
      <Header />
      <Main />
    </div>
  );
};

export default Home;

const Header = () => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between">
        <h2 className="lufga-bold lg:text-[1.4vw] pointer-events-none">
          flashy.
        </h2>
        <div className="flex justify-between items-center lg:gap-[2.5vw]">
          <button className="cursor-pointer lg:text-[1.1vw]">
            Entenda como funciona
          </button>
          <button className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[#131986]">
            <h2 className="text-[#3b45f2] transition-all duration-[.3s] ease-in-out lg:text-[1.1vw]">
              Entrar sem e-mail
            </h2>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col h-[70vh]">
        <h2 className="lufga-bold lg:text-[9vw] relative">
          flashy.
          <p className="lufga-med absolute bottom-[1.4vw] lg:left-[.5vw] lg:text-[1.3vw]">
            Repetição inteligente,
          </p>
          <p className="lufga-med absolute bottom-[-.1vw] lg:left-[.5vw] lg:text-[1.3vw]">
            Cards customizáveis,
          </p>
          <p className="lufga-med absolute bottom-[-1.6vw] lg:left-[.5vw] lg:text-[1.3vw]">
            Totalmente de graça.
          </p>
        </h2>
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div>
      <div>
        <h2 className="lufga-bold lg:text-[1.5vw]">Como funciona o Flashy?</h2>
      </div>
      <div className="flex items-top justify-between">
        <div className="flex flex-col lg:gap-[.7vw] lg:leading-[3.8vw] lg:mt-[1vw]">
          <h2 className="lg:text-[4vw]">
            Revise constantemente o que você não sabe{" "}
            <span className="lufga-bold text-[#fff]">ainda!</span>
          </h2>
          <span className="bg-[#ffffff73] block h-[.1vw] w-[40vw] lg:mt-[2vw]"></span>
          <Item
            number={"1"}
            desc={"Adicione um card com a informação que deseja memorizar"}
          />
          <Item
            number={"2"}
            desc={"Tente se lembrar da informação e confira se acertou"}
          />
          <Item
            number={"3"}
            desc={"Repita para reforçar sua memória até você saber"}
          />
        </div>
        <div>
          <h2 className="lg:text-[4vw]">
            Revise constantemente o que você não sabe{" "}
            <span className="lufga-bold text-[#fff]">ainda!</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

const Item = ({ number, desc }) => {
  return (
    <>
      <div className="flex items-center justify-start lg:gap-[1vw]">
        <div className="flex items-center justify-center bg-[#fff] lg:p-[.5vw] lg:w-[2.3vw] lg:h-[2.3vw]">
          <span className="lufga-bold text-[#3b45f2]">{number}</span>
        </div>
        <p>{desc}</p>
      </div>
      <span className="bg-[#ffffff73] block h-[.1vw] w-[40vw]"></span>
    </>
  );
};
