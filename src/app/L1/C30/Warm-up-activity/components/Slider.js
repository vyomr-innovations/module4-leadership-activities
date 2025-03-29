'use client'

import './style.css'


import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [nextBtnCanBeShow, setNextBtnCanBeShow] = useState(false)

    const obj = [
        {
            fileName: "babyLaughing.mp3",
            ans: "Laughing Baby"
        },
        {
            fileName: "balloonPop.mp3",
            ans: "Balloon Poping"
        },
        {
            fileName: "clockTicking.mp3",
            ans: "Clock Ticking"
        },
        {
            fileName: "cowMooing.mp3",
            ans: "Cow Mooing"
        },
        {
            fileName: "dogBark.mp3",
            ans: "Dog Barking"
        },
        {
            fileName: "doorBell.mp3",
            ans: "Door Bell"
        },
        {
            fileName: "raindropsFalling.mp3",
            ans: "Raindrops Falling"
        },
        {
            fileName: "train.mp3",
            ans: "Train"
        },
    ]

    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
        setNextBtnCanBeShow(false)
    }

    const getfileName = () => {
        const fileName = `/assets/L1-C30/Wram-up-activity/${obj[currentObjIndex]["fileName"]}`;
        return fileName
    }

    const handleGetResult = () => {
        setNextBtnCanBeShow(true)
    }

    return (
        <div className='slidesMainContainer'>

            <audio key={currentObjIndex} controls style={{ width: "360px" }} >
                <source src={getfileName()} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {!nextBtnCanBeShow &&
                <button onClick={handleGetResult}>Get Result</button>
            }

            {nextBtnCanBeShow &&
                <h1 className="heading">{obj[currentObjIndex]["ans"]}</h1>
            }

            {nextBtnCanBeShow && currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
