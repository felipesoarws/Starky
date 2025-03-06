import { useInView } from "react-intersection-observer";

const ColorInScroll = ({ text }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <span
      className="inline"
      ref={ref}
      style={{
        backgroundColor: inView ? "#fff" : "transparent",
        color: "var(--blue-light)",
        transition: "background-color 0.5s ease",
      }}
    >
      {text}
    </span>
  );
};

export default ColorInScroll;
