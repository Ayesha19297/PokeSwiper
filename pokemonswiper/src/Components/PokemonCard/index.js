import React from "react";
import { motion } from "framer-motion";
import "./cards.css";

const PokemonCard = ({ pokemon, onLike, onDislike }) => {
  const { name, abilities, types, id } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <motion.div
      className="pokemon-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pokemon-card">
        <motion.img
          src={imageUrl}
          alt={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {name}
        </motion.h2>
        <div>
          <ul>
            {abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
            {types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
        </div>
        <div className="button">
          <motion.button
            onClick={onLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="like"
          >
            Like
          </motion.button>
          <motion.button
            onClick={onDislike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="dislike"
          >
            Dislike
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonCard;
