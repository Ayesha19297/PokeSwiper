// src/components/PokemonCard.js
import React from 'react';
import "./cards.css";

const PokemonCard = ({ pokemon, onLike, onDislike }) => {
  const { name, abilities, types, id } = pokemon;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <div>
        <strong>Abilities:</strong>
        <ul>
          {abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Types:</strong>
        <ul>
          {types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
      </div>
      <div className="buttons">
        <button onClick={onLike}>Like</button>
        <button onClick={onDislike}>Dislike</button>
      </div>
    </div>
  );
};

export default PokemonCard;
