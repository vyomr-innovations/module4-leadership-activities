"use client";

import './page.css';

import Logo from './assets/logo.jpg';
import Slider from './components/Slider'
import Image from 'next/image';


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Leadership Scavenger Hunt</h1>
        <Image className="logo" src={Logo} alt="log" />
      </div>
      <hr />
      <br />
      <center>
        <Slider />
      </center>

    </div>
  );
}
