"use client";

import './page.css'

import Sequence from './components/Sequence'
import Filler from './components/Filler'
import { useState } from 'react';

export default function Home() {
  const [isStart, setIsStart] = useState(false)
  const handleStart = () => {
    setIsStart(true)
  }

  return (
    <div className="mainConatiner">
      <center>
        <h1 className="headingContaienr">A Leader Can, Have, Are</h1>
      </center>
      {/* <Sequence />÷ */}

      {isStart ? (
        <Sequence />
      ) : (
        <Filler />
      )}

      <center>
        {!isStart &&
          <button className='buttonak1' onClick={handleStart}>Start</button>
        }
      </center>

    </div>
  );
}
