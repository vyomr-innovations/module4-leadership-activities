'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        S1,
        S2
    ]
    
    const objHeading = [
        'It’s time to go home, and you can’t find your jacket! You remember leaving it somewhere, but you don’t know where. What will you do?',
        'You want to make friendship bracelets for all your classmates, but it’s taking too long. How can you finish them faster?'
    ]

    // (Is this leadership, or just kindness? Can small actions make someone a leader?)

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{objHeading[currentObj]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />
            {currentObj < obj.length-1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
