import { useInView } from "react-intersection-observer";

const ColorInScroll = ({ text }) => {
  // Usa o hook useInView para detectar quando o elemento está visível
  const { ref, inView } = useInView({
    threshold: 0.5, // Define que o callback será chamado quando 50% do elemento estiver visível
    triggerOnce: false, // Permite que o efeito seja ativado/desativado várias vezes
  });

  return (
    <p
      className="inline"
      ref={ref} // Referência para o elemento que será observado
      style={{
        backgroundColor: inView ? "#fff" : "transparent",
        color: "var(--blue-light)",
        transition: "background-color 0.5s ease", // Adiciona uma transição suave
      }}
    >
      {text}
    </p>
  );
};

export default ColorInScroll;
