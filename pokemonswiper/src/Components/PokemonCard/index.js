// src/components/PokemonCard.js
import React from "react";
import {motion} from 'framer-motion';
import "./cards.css";

const PokemonCard = ({ pokemon, onLike, onDislike }) => {
  const { name, abilities, types, id } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
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
  );
};

export default PokemonCard;
