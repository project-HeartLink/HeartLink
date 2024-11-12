/* eslint-disable react/react-in-jsx-scope */
import { motion } from "framer-motion";
import heartImg from "../../assets/RedHeart.png";

const HeartAnimation = () => {
  const hearts = [
    { id: 1, size: 80, left: "30%", delay: 0 },
    { id: 2, size: 100, left: "10%", delay: 0.3 },
    { id: 3, size: 120, left: "70%", delay: 0.6 },
    { id: 4, size: 90, left: "30%", delay: 0.9 },
    { id: 5, size: 110, left: "10%", delay: 1.2 },
    { id: 6, size: 80, left: "70%", delay: 1.0 },
    { id: 7, size: 130, left: "60%", delay: 1.8 },
    { id: 8, size: 110, left: "20%", delay: 1.5 },
  ];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "95vh",
        width: "auto",
      }}
    >
      {hearts.map((heart) => (
        <motion.img
          key={heart.id}
          src={heartImg}
          alt="Heart"
          style={{
            width: `${heart.size}px`,
            position: "absolute",
            bottom: "-150px",
            left: heart.left,
            transform: "translateX(-50%)",
          }}
          initial={{
            y: 0,
          }}
          animate={{
            y: -1100,
            x: [0, 20, -20, 20, -20, 0],
          }}
          transition={{
            duration: 5,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default HeartAnimation;
