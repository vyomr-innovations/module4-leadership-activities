'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import S4 from '../assets/s4.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)

    const [showProceedBtn, setShowProceedBtn] = useState(false)
    const [tempQ, setTempQ] = useState([])
    const [tempQCounter, setTempQCounter] = useState(0)

    const obj = [
        {
            img: S1,
            objHeading: "The Group Poster Project",
            objSubHeading: "Your teacher assigns a group poster project about environmental awareness. There are four students in your group: Emma, Liam, Alex, and Mia. Emma and Liam are working hard, but Alex and Mia are barely contributing. Mia is playing on her tablet, and Alex keeps saying, 'They’ve got it covered. I don’t need to do much.' As the deadline approaches, Emma and Liam feel frustrated because they are doing all the work.",
            questions: []
        },
        {
            img: S2,
            objHeading: "The Tug-of-War Game",
            objSubHeading: "At a sports event, the teacher organizes a tug-of-war game. Two teams of six players each are formed. When practicing with just two players, everyone pulls with full strength. But when all six players join, some of them, like Ryan and Zoe, stop pulling as hard. They assume the stronger players will handle it. The team loses because not everyone is giving their best effort.",
            questions: [
                "What could the team have done to make sure everyone contributed equally?",
                "What specific advice would you give to Ryan and Zoe?",
                "How could the stronger players have motivated Ryan and Zoe to pull harder?"
            ]
        },
        {
            img: S3,
            objHeading: "The Relay Race Challenge",
            objSubHeading: "During sports day, teams are running a relay race. Everyone is excited and running fast, but Liam, the third runner, sees that his team is already behind. He thinks, 'We’re probably going to lose anyway, so I don’t need to run that fast.' Instead of sprinting, he slows down, assuming Sophia, the last runner, will make up for it. But because of this, the team falls further behind and loses the race.",
            questions: [
                "If you were on Liam’s team, what would you say to him to encourage him?",
                "What could Liam’s team have done before the race to make sure everyone ran at full effort?"
            ]
        },
        {
            img: S4,
            objHeading: "The School Fundraiser Bake Sale",
            objSubHeading: "A group of students is running a bake sale fundraiser. At first, everyone is helping, but after a while, some students stop working. They assume others will handle things, so they start chatting instead of helping customers. Soon, the stall is messy, and people are confused about prices because not enough students are actively working.",
            questions: [
                "What problem is happening at the bake sale?",
                "Why do you think some have stopped helping?"
            ]
        },
    ]


    const handleNext = () => {
        setTempQCounter(0);
        setTempQ([])
        const new_currentObjIndex = currentObjIndex + 1
        setCurrentObjIndex(new_currentObjIndex)
        if (obj[new_currentObjIndex]["questions"].length > 0) {
            setShowProceedBtn(true)
        }

    }

    const handleProceed = () => {
        if (obj[currentObjIndex]["questions"][tempQCounter]) {
            setTempQ((prevTempQ) => [
                ...prevTempQ,
                obj[currentObjIndex]["questions"][tempQCounter]
            ]);
            const newCounter = tempQCounter + 1;

            setTempQCounter(newCounter);

            if (!obj[currentObjIndex]["questions"][newCounter]) {
                setShowProceedBtn(false)
            }
        }
        // console.log(tempQCounter)
        // console.log(tempQ)
    }

    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{obj[currentObjIndex]["objHeading"]}</h1>
            <div className='divContainer'>
                <h1 className='subHeading'>{obj[currentObjIndex]["objSubHeading"]}</h1>
                <Image alt="currentObj" className='currentObj' src={obj[currentObjIndex]["img"]} />
            </div>

            {tempQ.length > 0 &&
                <h1 className='text-[23px] font-semibold mb-3 mt-4' >Understanding the Impact</h1>
            }

            {tempQ.map((question, index) => (
                <div className='questions' key={index}>
                    <p>Q{index + 1} : {question}</p>
                </div>
            ))}


            {showProceedBtn && obj[currentObjIndex]["questions"].length > 0 &&
                <button onClick={handleProceed}>Proceed</button>
            }

            <br />

            {!showProceedBtn && currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
            
            <br />
            <br />

        </div>
    );
}
