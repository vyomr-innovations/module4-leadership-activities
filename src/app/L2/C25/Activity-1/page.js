"use client";

import './page.css';

import Logo from './assets/logo.jpg';
import Com from './components/Com'
import Image from 'next/image';


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Find the leadership qualities</h1>
        <Image className="logo" src={Logo} alt="log" />
      </div>

      <br />
      <center>
        <Com />
      </center>

    </div>
  );
}
