"use client";

import './page.css';

import AudioCom from './components/AudioCom'

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Animal Freeze Dance</h1>
      </div>
      <br />
      <center>
        <AudioCom />
      </center>

    </div>
  );
}
