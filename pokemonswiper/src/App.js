import React, { useState, useEffect } from "react";
import HomePage from "./Components/HomePage";
import axios from "axios";
import "./App.css";
import SwipeAnimation from "./Components/SwipeAnimation.js";
import LikedCards from "./Components/LikedCards";

const App = () => {
  const [started, setStarted] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [displayedIds, setDisplayedIds] = useState(new Set());
  const [likedPokemon, setLikedPokemon] = useState([]);
  const [showLiked, setShowLiked] = useState(false);

  useEffect(() => {
    if (started && cardCount < 10) {
      loadRandomPokemon();
    }
  }, [started, cardCount]);

  const loadRandomPokemon = async () => {
    let id;
    do {
      id = Math.floor(Math.random() * 898) + 1;
    } while (displayedIds.has(id)); // Ensure unique ID
    await fetchPokemonById(id);
  };

  const fetchPokemonById = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(response.data);
      setDisplayedIds(new Set([...displayedIds, id]));
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const handleLike = () => {
    setLikedPokemon([...likedPokemon, pokemon]);
    handleNextCard();
  };

  const handleDislike = () => {
    handleNextCard();
  };

  const handleNextCard = () => {
    if (cardCount < 9) {
      setCardCount(cardCount + 1);
    } else {
      setCardCount(cardCount + 1);
      setPokemon(null); // Stop showing new cards after 10
    }
  };

  const toggleView = () => {
    setShowLiked(!showLiked); // Toggle the view
  };

  const goToHome = () => {
    setStarted(false);
    setShowLiked(false);
    setCardCount(0);
    setLikedPokemon([]);
    setDisplayedIds(new Set());
    setPokemon(null);
  };

  return (
    <div className="app">
      {!started ? (
        <HomePage start={() => setStarted(true)} />
      ) : (
        <div>
          {!showLiked ? (
            <div>
              {cardCount < 10 ? (
                <div>
                  {pokemon ? (
                    <SwipeAnimation
                      pokemon={pokemon}
                      onLike={handleLike}
                      onDislike={handleDislike}
                    />
                  ) : (
                    <p>Loading Pokémon...</p>
                  )}
                </div>
              ) : (
                <div>
                  <p> You are done with choosing the team... great !!!</p>
                  <button onClick={toggleView} className="view-liked-button">
                    View Liked Pokémon
                  </button>
                </div>
              )}
            </div>
          ) : (
            <LikedCards likedPokemon={likedPokemon} goToHome={goToHome} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
