import React from "react";
import "./likes.css";

const LikedCards = ({ likedPokemon, goToHome }) => {
  return (
    <div className="liked-pokemon">
      <h2>Your Pokemon team . . . </h2>
      <div className="pokemon-grid">
        {likedPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
            {/* <p> {pokemon.types.map((type) => type.type.name).join(", ")}</p>
            <p>
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p> */}
          </div>
        ))}
      </div>
      <button onClick={goToHome} className="back-to-home-button">
        Back to Home
      </button>
    </div>
  );
};

export default LikedCards;
