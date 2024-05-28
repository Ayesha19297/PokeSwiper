import React, { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./Components/HomePage";
import "./App.css";

function App() {
  const [initiate, setInitiate] = useState(false);

  useEffect((id) => {
    //const id = Math.floor(Math.random() * 898) + 1;
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      setInitiate(response.data);
      console.log(response.data);
    });
  }, []);
  return <div className="App">
    <HomePage />
    </div>;
}

export default App;
