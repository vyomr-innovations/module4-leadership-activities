'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        S1,
        S2,
        S3
    ]

    const objHeading = [
        'The Playground Disagreement',
        'The Sibling Showdown',
        'The Football Match Dilemma'
    ]

    const objSubHeading = [
        'Jake & Lily, two friends argue over who gets to use the swing first, where Lily just ran and sat on the swing.',
        'Two siblings Mia & Noah both want to watch different TV shows at the same time.',
        'Jordan asked for a pass so he could score a goal, but Sam took the shot himself because he thought he had a clear path.'
    ]

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className='headingOg'>{objHeading[currentObj]}</h1>
            <h1 className="heading">{objSubHeading[currentObj]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />
            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
