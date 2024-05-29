import React from "react";
import "./likes.css";

const LikedCards = ({ likedPokemon }) => {
  return (
    <div className="liked-pokemon-list">
      <h2>Liked Pokémon</h2>
      <ul>
        {likedPokemon.map((pokemon) => (
          <li key={pokemon.id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedCards;
