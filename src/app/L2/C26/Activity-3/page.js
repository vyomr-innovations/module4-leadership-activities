"use client";

import './page.css';

import Slider from './components/Slider'


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Perspective Switch Game</h1>
      </div>
      <hr />
      <br />
      <center>
        <Slider />
      </center>

    </div>
  );
}
