import '../css/Home.css';
import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import sun from "../../assets/sun.png";
import cloud from "../../assets/cloud.png";
import clouds from "../../assets/clouds.png";
const Home = () => {
    const navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/Layout");
  };

    return <div className= "back1">
        <div className="hm">
        <h1  >Welcome to MyWeather Home</h1>
             <button onClick={handleClick1}>Let's go!</button>
        </div>
        <div className="m" ><img srcSet={sun} alt="sun" />
        <img srcSet={clouds} alt="clouds" />
        <img srcSet={cloud} alt="Wilaya" /></div>
        </div>;
};

export default Home
