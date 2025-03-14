"use client";

import './page.css';

import Com1 from './components/Com1'


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">The Great Balloon Challenge</h1>
      </div>

      <br />
      <hr />

      <center>
        <Com1 />
      </center>
    </div>
  );
}
