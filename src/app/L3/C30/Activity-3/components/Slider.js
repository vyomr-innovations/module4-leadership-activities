'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            heading: "The Whisper Chain",
            subHeading: "Sarah overheard someone saying something mean. She told her best friend, just to vent. But by the end of the day, the story had spread, changed, and caused someone else to get really hurt."
        },
        {
            img: S2,
            heading: " Birthday Switch-Up",
            subHeading: "Arjun was excited for his birthday at the arcade. But on the morning of his birthday, his little sister looked sad because she doesn't like loud games. Arjun changed the plan and took everyone to the zoo instead. Even though he made her happy, he felt disappointed all day."
        },
        {
            img: S3,
            heading: "The Missing Sock Blame",
            subHeading: "Sam couldn’t find his favourite football socks before the match. He got angry and blamed his sister because she borrows his stuff sometimes. He even told their mum she probably took them. Later, he found the socks in his own sports bag — he’d packed them and forgotten!"
        },
    ]

   
    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{obj[currentObjIndex]["heading"]}</h1>
            <h1 className="subHeading">{obj[currentObjIndex]["subHeading"]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObjIndex]["img"]} />
            {currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
