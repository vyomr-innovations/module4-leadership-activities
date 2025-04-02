"use client";

import './page.css';

import Slider from './components/Slider'
import Filler from './components/Filler'
import { useState, useRef } from 'react';


export default function Home() {
  const [isStart, setIsStart] = useState(false)
  const [showStartBtn, setShowStartBtn] = useState(false)
  const bottomRef = useRef(null);
  const handleShowStartBtn = () => {
    setShowStartBtn(true)
    setTimeout(function () {
      if (bottomRef && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 600)
  }
  const handleStart = () => {
    setIsStart(true)
  }
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">
          {isStart ? 'Council of Kids - Let’s Make the Rules!' : 'Pizza Party'}
        </h1>
      </div>
      <hr />
      <br />
      <center>
        {isStart ? (
          <Slider />
        ) : (
          <Filler
            handleShowStartBtn={handleShowStartBtn}
          />
        )}

        {showStartBtn && !isStart &&
          <button ref={bottomRef} className='buttonak1' onClick={handleStart}>Start</button>
        }
      </center>

    </div>
  );
}
