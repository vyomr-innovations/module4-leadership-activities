"use client";

import './page.css';

import Slider from './components/Slider'
import Filler from './components/Filler'
import { useState } from 'react';


export default function Home() {
  const [start, setStart] = useState(false)

  const handleStart = () => {
    setStart(true)
  }
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Plan to Help at Home</h1>
      </div>
      <hr />
      <br />
      <center>
        {start ? (
          <Slider />

        ) : (
          <Filler />
        )}

        {!start &&
          <button className='startBtn' onClick={handleStart}>Start</button>
        }
      </center>

    </div>
  );
}
