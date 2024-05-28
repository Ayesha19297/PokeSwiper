import React from "react";
import { motion } from "framer-motion";
import "./home.css";

const HomePage = () => {
  return (
    <div className="container">
      <h2 className="heading">Hello, welcome to PokeSwiper!!!</h2>
      <p className="content">How to play PokeSwipe ?</p>
      <p className="content">
        Pokemon appears one at a time.
        <br />
        Choose "like" or "dislike"
        <br />
        and build your favourite pokemon team
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn"
      >
        Let's start
      </motion.button>
    </div>
  );
};
export default HomePage;
