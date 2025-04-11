
'use client'

import './style.css'

import Image from 'next/image'
import S1 from '../assets/s1.jpeg';

import { useState } from 'react';

export default function Filler() {
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        S1
    ]
    
    const objHeading = [
        'Rhyan is six years old. He loves playing, but he doesn’t help much at home. His parents feel tired doing so much household work. One day, he realizes he wants to help them and make them happy. But he’s not sure how!'
    ]

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='fillerMainContainer'>
            <h1 className="heading">{objHeading[currentObj]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />
            {currentObj < obj.length-1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
