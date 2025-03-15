import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

import "aos/dist/aos.css";
import "../styles/fonts.css";

import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

import ColorInScroll from "../components/ColorInScroll";

import graphic from "../assets/images/graphic.png";
import celphones from "../assets/images/celphones.png";

const Home = () => {
  useEffect(() => {
    AOS.init();
    document.title = "felipe | seu app de estudo";
  }, []);

  return (
    <div className="mx-6 my-6 lg:mx-[3vw] lg:my-[1.5vw]">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;

const Header = () => {
  return (
    <div className="min-h-[90vh]">
      <div className="fixed rounded-[2rem] backdrop-blur-[8.6px] top-[1.5rem] left-[2rem] right-[2rem] p-[.5rem] px-[1.5rem] bg-[rgba(99,238,238,0.05)] lg:p-[.8vw] lg:px-[1.5vw] lg:rounded-[2vw] lg:top-[1vw] lg:left-[3vw] lg:right-[3vw] ">
        <div className="flex justify-between items-center">
          <h2
            className="lufga-bold lg:text-[1.4vw] pointer-events-none"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            starky.
          </h2>
          <div className="flex justify-between gap-[1rem] items-center lg:gap-[2.5vw]">
            <button
              className="cursor-pointer text-[.8rem] lg:text-[1.1vw]"
              data-aos="fade-down"
              data-aos-duration="1000"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 0.75,
                });
              }}
            >
              Como funciona
            </button>
            <Link to={"/app"}>
              <button
                className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[.8rem] px-[.6rem] lg:rounded-[1.2vw] lg:px-[1.2vw] lg:py-[.4vw] hover:bg-[#131986]"
                data-aos="fade-down"
                data-aos-duration="1500"
              >
                <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[.8rem] lg:text-[1.1vw]">
                  Entrar
                </h2>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center flex-col h-[55vh] lg:h-[65vh]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="lufga-bold relative select-none text-[4rem] lg:text-[9vw] ">
          starky.
          <p
            className="lufga-med absolute text-[.9rem] bottom-[.4rem] lg:bottom-[1.4vw]  lg:left-[.5vw] lg:text-[1.3vw]"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            Repetição inteligente,
          </p>
          <p
            className="lufga-med absolute text-[.9rem] bottom-[-.4rem] lg:bottom-[-.1vw]   lg:left-[.5vw] lg:text-[1.3vw]"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Cards customizáveis,
          </p>
          <p
            className="lufga-med absolute text-[.9rem] bottom-[-1.3rem] lg:bottom-[-1.6vw]   lg:left-[.5vw] lg:text-[1.3vw]"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            Totalmente de graça.
          </p>
        </h2>
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div
      className="flex flex-col gap-[2rem] lg:gap-[1vw] lg:mx-[3vw]"
      id="como-funciona"
    >
      <div className="lg:mb-[10vw]">
        <div className="flex items-center justify-center lg:gap-[.5vw] lg:justify-between">
          <h2 className="lufga-bold text-center text-[1.5rem] lg:text-[1.5vw] lg:text-left">
            Como funciona o Starky?
          </h2>
          <span className="bg-[#ffffff73] block h-[.1vw] lg:w-[75%]"></span>
        </div>
        <div className="flex items-top justify-between flex-col gap-[3rem] lg:flex-row lg:gap-[2vw] lg:mt-[1vw]">
          <div className="text-center flex flex-col gap-[1rem] mt-2 lg:gap-[1.3vw] lg:mt-[1vw] lg:text-left">
            <h2
              className="text-[1.5rem] m-2 leading-7 lg:text-[4.6vw] lg:w-[45vw] lg:mb-[2vw] lg:leading-[4.5vw] select-none"
              data-aos="fade-down"
              data-aos-duration="750"
            >
              <span className="lufga-bold inline text-[#fff] lg:block">
                Revise
              </span>{" "}
              constantemente o que você não sabe{" "}
              <span className="lufga-bold block text-[#fff]">ainda!</span>
            </h2>
          </div>
          <div className="flex flex-col gap-[1rem] mt-2 lg:gap-[1.6vw] lg:mt-[1vw]">
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
        </div>
      </div>

      <div>
        <h2
          className="lufga-bold text-[1.5rem] mt-8 text-center lg:text-left lg:text-[1.5vw] "
          data-aos="fade-down"
          data-aos-duration="500"
        >
          Por que funciona?
        </h2>
        <div className="flex items-top flex-col justify-between gap-[3rem] text-center lg:text-left lg:flex-row lg:gap-[4.5vw]">
          <div className="flex flex-col gap-[1rem] mt-4 lg:gap-[2vw] lg:mt-[2vw] lg:w-[40vw]">
            <p
              className="lufga-reg lg:text-[1.2vw]"
              data-aos="fade-right"
              data-aos-duration="750"
            >
              Na Starky, utilizamos o sistema de repetição espaçada{" "}
              <strong className="lufga-bold">
                <ColorInScroll text={"(SRS - Spaced Repetition System)"} />
              </strong>
              , que otimiza a memorização e retenção de informações a longo
              prazo.
            </p>
            <p
              className="lufga-reg lg:text-[1.2vw]"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              Ele funciona através de cartões de estudo{" "}
              <strong className="lufga-bold">
                <ColorInScroll text={"(cards)"} />
              </strong>
              , que são revisados de acordo com a dificuldade que o usuário
              atribui a cada um.
            </p>
            <p
              className="lufga-reg lg:text-[1.2vw]"
              data-aos="fade-right"
              data-aos-duration="1250"
            >
              Quando você aprende algo pela primeira vez, sua memória desaparece
              rapidamente, mas se você revisar, isso reforçará sua memória
              novamente.
            </p>
          </div>
          <div className="pointer-events-none">
            <img
              src={graphic}
              alt="graphic"
              className="lg:w-[40vw] lg:translate-y-[-3vw]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="lg:overflow-hidden relative mt-10 lg:mt-[5vw] lg:mx-[3vw]">
      <div className="items-center justify-center flex flex-col lg:hidden">
        <div className="text-center">
          <h2 className="uppercase lufga-bold text-[2.5rem] leading-[2.3rem] ">
            <span
              className="block"
              data-aos="fade-right"
              data-aos-duration="750"
            >
              Transforme
            </span>
            <span
              className="block"
              data-aos="fade-right"
              data-aos-duration="750"
            >
              sua maneira
            </span>
            <span
              className="block"
              data-aos="fade-right"
              data-aos-duration="750"
            >
              de estudar!
            </span>
          </h2>
          <div className="mt-[2rem]">
            <p className="text-[1.2rem]">
              Acesse os links abaixo para acessar o programa e/ou também para
              conhecer mais o criador desse site! :)
            </p>
            <div className="my-[2rem]">
              <nav className="footer-links">
                <ul className="flex flex-col gap-[.5rem] items-center justify-center">
                  <li>
                    <Link to={"/app"}>
                      <button className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out rounded-[1.2rem] px-[1.5rem] py-[.6rem] hover:bg-[#131986]">
                        <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[1.5rem]">
                          Acessar o programa
                        </h2>
                      </button>
                    </Link>
                  </li>
                  <li className="mt-[2rem] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] ">
                    <a
                      href="https://www.linkedin.com/in/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6rem]"
                    >
                      <LinkedinLogo size={40} color="#ececec" weight="fill" />
                      <span className="text-[1.3rem] ">Felipe Soares</span>
                    </a>
                  </li>
                  <li className="mt-[.7rem] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] ">
                    <a
                      href="https://github.com/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6rem]"
                    >
                      <GithubLogo size={40} color="#ececec" weight="fill" />
                      <span className="text-[1.3rem] ">@felipesoarws</span>
                    </a>
                  </li>
                  <li className="mt-[.7rem] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] ">
                    <a
                      href="https://www.instagram.com/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6rem]"
                    >
                      <InstagramLogo size={40} color="#ececec" weight="fill" />
                      <span className="text-[1.3rem] ">@felipesoarws</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <span className="block mt-[4rem] text-[#ffffff]">
                © 2025 felipesoarws
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center lg:flex">
        <img
          src={celphones}
          alt="celphones"
          className="select-none pointer-events-auto lg:w-[50vw] lg:translate-y-[-1vw] lg:-translate-x-[19vw]"
        />
        <div className="absolute right-0 top-0 text-right">
          <h2 className="uppercase lufga-bold text-[3.8vw] leading-[4vw] ">
            <span
              className="block"
              data-aos="fade-left"
              data-aos-duration="750"
            >
              Transforme
            </span>
            <span
              className="block"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              sua maneira
            </span>
            <span
              className="block"
              data-aos="fade-left"
              data-aos-duration="1250"
            >
              de estudar!
            </span>
          </h2>
          <div className="w-[35vw] mt-[2vw]">
            <p
              className="text-[1.2vw]"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              Acesse os links abaixo para acessar o programa e/ou também para
              conhecer mais o criador desse site! :)
            </p>
            <div className="my-[2vw] ">
              <nav className="footer-links ">
                <ul className="flex flex-col gap-[.5vw] items-end justify-center">
                  <li data-aos="fade-left" data-aos-duration="1000">
                    <Link to={"/app"}>
                      <button className="btn-header bg-[#FFFFFF] cursor-pointer transition-all duration-[.3s] ease-in-out lg:rounded-[1.2vw] lg:px-[1.5vw] lg:py-[.6vw] hover:bg-[#131986]">
                        <h2 className="text-[var(--blue-light)] transition-all duration-[.3s] ease-in-out text-[1.5vw]">
                          Acessar o programa
                        </h2>
                      </button>
                    </Link>
                  </li>
                  <li
                    className="mt-[2vw] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] "
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <a
                      href="https://www.linkedin.com/in/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6vw]"
                    >
                      <span className="text-[1.3vw] ">Felipe Soares</span>
                      <LinkedinLogo size={40} color="#ececec" weight="fill" />
                    </a>
                  </li>
                  <li
                    className="mt-[.7vw] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] "
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <a
                      href="https://github.com/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6vw]"
                    >
                      <span className="text-[1.3vw] ">@felipesoarws</span>
                      <GithubLogo size={40} color="#ececec" weight="fill" />
                    </a>
                  </li>
                  <li
                    className="mt-[.7vw] transition-all duration-[.3s] w-fit ease-in-out text-[var(--white-gray)] hover:text-[var(--blue-midnight)] "
                    data-aos="fade-left"
                    data-aos-duration="1000"
                  >
                    <a
                      href="https://www.instagram.com/felipesoarws/"
                      target="_blank"
                      rel="noopener"
                      className="flex items-center justify-start gap-[.6vw]"
                    >
                      <span className="text-[1.3vw] ">@felipesoarws</span>
                      <InstagramLogo size={40} color="#ececec" weight="fill" />
                    </a>
                  </li>
                </ul>
              </nav>
              <span className="block mt-[4vw] text-[#ffffff] lg:text-[1.1vw]">
                © 2025 felipesoarws
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Item = ({ number, desc }) => {
  return (
    <>
      <div className="flex items-center justify-start gap-[1.2rem] lg:gap-[1vw]">
        <div
          className="flex items-center justify-center bg-[#fff] min-w-[2rem] min-h-[2rem] p-[.3rem] lg:p-[.5vw] lg:w-[2.3vw] lg:h-[2.3vw]"
          data-aos="fade-right"
          data-aos-duration="500"
        >
          <span className="lufga-bold text-[var(--blue-light)] lg:text-[1.2vw]">
            {number}
          </span>
        </div>
        <p
          className="lg:text-[1.1vw] leading-5 lg:leading-[1.2vw]"
          data-aos="fade-right"
          data-aos-duration="750"
        >
          {desc}
        </p>
      </div>
      <span className="bg-[#ffffff73] block h-[.1vw] lg:w-[100%]"></span>
    </>
  );
};
