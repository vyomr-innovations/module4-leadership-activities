"use client";

import './page.css';

import Com1 from './components/Com1'
import Com2 from './components/Com2'
import { useState } from 'react';


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNextPage = () => {
    setCurrentIndex(currentIndex + 1)
  }
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Role Playing Leadership Strategies</h1>
      </div>

      <br />
      <hr />

      <center>
        {currentIndex === 0 ?
          (
            <Com1 />
          ) : (
            <Com2 />
          )}
      </center>

      {currentIndex === 0 &&
        <div className="mt-6 text-center">
          <button
            onClick={handleNextPage}
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Next
          </button>
        </div>
      }
    </div>
  );
}
