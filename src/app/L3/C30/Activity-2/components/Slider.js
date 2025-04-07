'use client'

import './style.css'

import SwotCom from './SwotCom';
import Com2 from './Com2';
import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const [showNextBtn, setShowNextBtn] = useState(false)

    const obj = [
        {
            img: S1,
            heading: "Your Sports Day Plan",
            swotHeading1: "",
            swotHeading2: "",
            subHeading: "Imagine your Sports Day just around the corner, and you’re excited! There are many events like running, swimming, high jump, and team games. But you can only enter two events, and you want to do your best and have fun."
        },
        {
            img: S2,
            heading: "The Great School Lunch Debate",
            swotHeading1: "SWOT analysis for Alex’s Idea",
            swotHeading2: "SWOT analysis for Mia’s Idea",
            subHeading: "Big news! Your class has been asked to redesign the lunch menu. You’re in a group with Alex and Mia, but they have very different ideas…” Alex’s Idea: Healthier lunches (fruits, veggies, low sugar), Mia’s Idea: Fun food (burgers, pizza, fries)"
        },
        {
            img: S3,
            heading: "Class Fund – How Should We Use It?",
            swotHeading1: "SWOT analysis for Option A – Science Kits",
            swotHeading2: "SWOT analysis for Option A – Class Excursion",
            subHeading: "Your class won $500 after a kindness challenge. Now your teacher wants your group to decide how to spend it wisely. There are two choices…” Option A: Buy Science Kits for hands-on learning. Option B: Plan a fun, learning-filled class trip."
        }
    ]


    const handleNext = () => {
        setShowNextBtn(false)
        setCurrentObjIndex(currentObjIndex + 1)
    }


    const passOnSwotData = (currentSwotData, currentSolutionLen, seen) => {
        // console.log(currentSwotData, currentSolutionLen, seen)
        if (currentSolutionLen === 4) {
            setShowNextBtn(true)
        }
    }

    return (
        <div className='slidesMainContainer'>
            {currentObjIndex === 0 ? (
                <div className="flex gap-4">
                    <div className="w-1/2 p-4 leftCon">
                        <h1 className='headingOg'>{obj[currentObjIndex]["heading"]}</h1>
                        <h1 className="heading">{obj[currentObjIndex]["subHeading"]}</h1>
                        <Image alt="currentObjIndex" className='currentObj' src={obj[currentObjIndex]["img"]} />

                    </div>
                    <div className="w-1/2 p-4 rightCon">
                        <SwotCom
                            seen="s1"
                            passOnSwotData={passOnSwotData}
                            currentObjIndex={currentObjIndex}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    <Com2
                        passOnSwotData={passOnSwotData}
                        currentObj={obj[currentObjIndex]}
                        currentObjIndex={currentObjIndex}
                    />
                </div>
            )}

            {showNextBtn && currentObjIndex < obj.length - 1 &&
                <button className='nextButton' onClick={handleNext}>Next</button>
            }
        </div>
    );
}
