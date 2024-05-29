import React from "react";
import { motion } from "framer-motion";
import "./likes.css";

const LikedCards = ({ likedPokemon, goToHome }) => {
  return (
    <div className="liked-pokemon">
      <h2>Your Pokemon team . . . </h2>
      <div className="pokemon-grid">
        {likedPokemon.map((pokemon) => (
          <motion.div
            key={pokemon.id}
            className="pokemon-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: likedPokemon.indexOf(pokemon) * 0.2,
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={goToHome}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="back-to-home-button"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: likedPokemon.length * 0.2 }}
      >
        Back to Home
      </motion.button>
    </div>
  );
};

export default LikedCards;
