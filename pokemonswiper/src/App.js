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
  const [mode, setMode] = useState("light");

  //load a random pokemon when app started and card count is less than 10
  useEffect(() => {
    if (started && cardCount < 10) {
      loadRandomPokemon();
    }
  }, [started, cardCount]);

  //To load the saved theme mode
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  //To apply current theme mode to the body
  useEffect(() => {
    document.body.className = mode;
    console.log(`Theme set to: ${mode}`);
  }, [mode]);

  //picks a random pokemon id that has not been displayed before and generates unique id
  const loadRandomPokemon = async () => {
    let id;
    do {
      id = Math.floor(Math.random() * 898) + 1;
    } while (displayedIds.has(id)); // Ensure unique ID
    await fetchPokemonById(id);
  };

  //fetch details of pokemon by taking the generated unique id
  const fetchPokemonById = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon(response.data);
      setDisplayedIds(new Set([...displayedIds, id]));
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemon(null);
    }
  };

  //when like button is clicked, maintain a record of that card and display next card
  const handleLike = () => {
    setLikedPokemon([...likedPokemon, pokemon]);
    handleNextCard();
  };

  //when dislike button is clicked, display next card
  const handleDislike = () => {
    handleNextCard();
  };

  //function to display or not display the next pokemon card
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

  //switch between dark and light mode
  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
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
      {/* button to choose dark or light mode  */}
      <button onClick={toggleMode} className="mode-toggle-button">
        Switch to {mode === "light" ? "Dark" : "Light"} Mode
      </button>
      {/* conditional rendering */}
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
                    <p className="finish msg">Loading Pokemon...</p>
                  )}
                </div>
              ) : (
                <div className="finish">
                  <p className="msg">
                    You are done with choosing the team... great !!!
                  </p>
                  <button onClick={toggleView} className="view-liked-button">
                    View your Pokemon team
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
