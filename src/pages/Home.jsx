import { useEffect } from "react";

import ColorInScroll from "../components/ColorInScroll";

import cards from "../assets/images/cards.png";
import graphic from "../assets/images/graphic.png";
import "../styles/fonts.css";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "starky | seu app de estudo";
  }, []);

  return (
    <div className="mx-6 my-6 lg:mx-[3vw] lg:my-[1.5vw]">
      <Header />
      <Main />
    </div>
  );
};

export default Home;

const Header = () => {
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="lufga-bold lg:text-[1.4vw] pointer-events-none">
          starky.
        </h2>
        <div className="flex justify-between gap-[1rem] items-center lg:gap-[2.5vw]">
          <button className="cursor-pointer text-[.8rem] lg:text-[1.1vw]">
            <a href="#como-funciona">Como funciona</a>
          </button>
          <Link to={"/app"}>
            <button className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[.8rem] px-[.6rem] lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[#131986]">
              <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[.8rem] lg:text-[1.1vw]">
                Entrar
              </h2>
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col h-[70vh]">
        <h2 className="lufga-bold relative select-none text-[4rem] lg:text-[9vw] ">
          starky.
          <p className="lufga-med absolute text-[.9rem] bottom-[.4rem] lg:bottom-[1.4vw]  lg:left-[.5vw] lg:text-[1.3vw]">
            Repetição inteligente,
          </p>
          <p className="lufga-med absolute text-[.9rem] bottom-[-.4rem] lg:bottom-[-.1vw]   lg:left-[.5vw] lg:text-[1.3vw]">
            Cards customizáveis,
          </p>
          <p className="lufga-med absolute text-[.9rem] bottom-[-1.3rem] lg:bottom-[-1.6vw]   lg:left-[.5vw] lg:text-[1.3vw]">
            Totalmente de graça.
          </p>
        </h2>
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div className="flex flex-col gap-[2rem] lg:gap-[1vw]">
      <div className="lg:min-h-screen" id="como-funciona">
        <div>
          <h2 className="lufga-bold text-[1.5rem] lg:text-[1.5vw]">
            Como funciona o Starky?
          </h2>
        </div>
        <div className="flex items-top justify-between flex-col gap-[3rem] lg:flex-row">
          <div className="flex flex-col gap-[1rem] mt-2 lg:gap-[1.3vw] lg:mt-[1vw] ">
            <h2 className="text-[1.2rem] mb-2 leading-6 lg:text-[4vw] lg:w-[46vw] lg:mb-[2vw] lg:leading-[3.2vw] select-none">
              Revise constantemente o que você não sabe{" "}
              <span className="lufga-bold text-[#fff]">ainda!</span>
            </h2>
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
              desc={
                "Avalie a dificuldade do card para ajustar quando você verá novamente"
              }
            />
            <Item
              number={"4"}
              desc={"Repita para reforçar sua memória até você saber"}
            />
          </div>
          <div>
            <img
              src={cards}
              alt="cards"
              className="pointer-events-none lg:w-[38vw]"
            />
          </div>
        </div>
      </div>
      <div className="lg:min-h-screen">
        <h2 className="lufga-bold text-[1.5rem] mt-8 lg:text-[1.5vw]">
          Por que funciona?
        </h2>
        <div className="flex items-top flex-col justify-between gap-[3rem] lg:flex-row lg:gap-[4.5vw]">
          <div className="flex flex-col gap-[1rem] mt-4 lg:gap-[2vw] lg:mt-[2vw] lg:w-[40vw]">
            <p className="lufga-reg lg:text-[1.4vw]">
              Na Starky, utilizamos o sistema de repetição espaçada{" "}
              <strong className="lufga-bold">
                <ColorInScroll text={"(SRS - Spaced Repetition System)"} />
              </strong>
              , que otimiza a memorização e retenção de informações a longo
              prazo.
            </p>
            <p className="lufga-reg lg:text-[1.4vw]">
              Ele funciona através de cartões de estudo{" "}
              <strong className="lufga-bold">
                <ColorInScroll text={"(cards)"} />
              </strong>
              , que são revisados de acordo com a dificuldade que o usuário
              atribui a cada um.
            </p>
            <p className="lufga-reg lg:text-[1.4vw]">
              Quando você aprende algo pela primeira vez, sua memória desaparece
              rapidamente, mas se você revisar, isso reforçará sua memória
              novamente.
            </p>
          </div>
          <div>
            <img
              src={graphic}
              alt="graphic"
              className="pointer-events-none lg:w-[45vw] lg:translate-y-[-2.5vw]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ number, desc }) => {
  return (
    <>
      <div className="flex items-center justify-start gap-[1.2rem] lg:gap-[1vw]">
        <div className="flex items-center justify-center bg-[#fff] min-w-[2rem] min-h-[2rem] p-[.3rem] lg:p-[.5vw] lg:w-[2.3vw] lg:h-[2.3vw]">
          <span className="lufga-bold text-[var(--blue-light)] lg:text-[1.1vw]">
            {number}
          </span>
        </div>
        <p className="lg:text-[1.2vw] leading-5 lg:leading-[2vw]">{desc}</p>
      </div>
      <span className="bg-[#ffffff73] block h-[.1vw] lg:w-[45vw]"></span>
    </>
  );
};
