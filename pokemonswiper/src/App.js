// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HomePage from "./Components/HomePage";
// import "./App.css";

// function App() {
//   const [start, setStart] = useState(false);

//   useEffect(() => {
//     //const id = Math.floor(Math.random() * 898) + 1;
//     axios.get(`https://pokeapi.co/api/v2/pokemon/`).then((response) => {
//       setStart(response.data);
//       console.log(response.data);
//     });
//   }, []);
//   return (
//     <div className="App">
//       <HomePage start={() => setStart(true)} />
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState, useEffect } from "react";
import HomePage from "./Components/HomePage";
import axios from "axios";
import "./App.css";
import SwipeAnimation from "./Components/SwipeAnimation.js";

const App = () => {
  const [started, setStarted] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [cardCount, setCardCount] = useState(0);
  const [displayedIds, setDisplayedIds] = useState(new Set());
  const [likedPokemon, setLikedPokemon] = useState([]);

  useEffect(() => {
    if (started && cardCount < 10 && !pokemon) {
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

  // const fetchPokemonByName = async (name) => {
  //   try {
  //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  //     setPokemon(response.data);
  //   } catch (error) {
  //     console.error('Error fetching Pokémon data:', error);
  //   }
  // };

  const handleLike = () => {
    setLikedPokemon([...likedPokemon, pokemon]);
    handleNextCard();
  };

  const handleDislike = () => {
    handleNextCard();
  };

  const handleNextCard = () => {
    if (cardCount < 9) {
      // Limit to 10 cards
      setCardCount(cardCount + 1);
      loadRandomPokemon();
    } else {
      setPokemon(null); // Stop showing new cards after 10
    }
  };

  return (
    <div className="app">
      {!started ? (
        <HomePage start={() => setStarted(true)} />
      ) : (
        <div>
          {pokemon ? (
            <SwipeAnimation
              pokemon={pokemon}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ) : (
            <p>No more Pokemon cards to display.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
