import React from "react";
import { motion, useAnimation } from "framer-motion";
import PokemonCard from "../PokemonCard";
import "./swipe.css";

const SwipeAnimation = ({ pokemon, onLike, onDislike }) => {
  const controls = useAnimation();

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onLike();
      controls.start({ x: 300, opacity: 0 });
    } else if (info.offset.x < -100) {
      onDislike();
      controls.start({ x: -300, opacity: 0 });
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return (
    <motion.div
      drag="x"
      onDragEnd={handleDragEnd}
      animate={controls}
      className="swipeable-card"
    >
      <PokemonCard pokemon={pokemon} onLike={onLike} onDislike={onDislike} />
    </motion.div>
  );
};
export default SwipeAnimation;
