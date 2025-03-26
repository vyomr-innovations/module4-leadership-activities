'use client'

import './page.css'
import QuizIcon  from './assets/quizIcon.jpg';
import Image from 'next/image';
import SlideShow from './components/SlideShow'

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">The 30-Second Brain Blitz!</h1>
        <Image alt='logo' className="logo" src={QuizIcon} />
      </div>
      <hr />
      <SlideShow />
    </div>
  );
}
