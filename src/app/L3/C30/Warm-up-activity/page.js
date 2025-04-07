'use client'

import './page.css'
import SlideShow from './components/SlideShow'

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">Choose Your Adventure</h1>
      </div>
      <hr />
      <SlideShow />
    </div>
  );
}
