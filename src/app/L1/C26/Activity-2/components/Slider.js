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
        'Imagine your friend comes to school, opens their bag, and realizes they forgot their lunch. They look sad and hungry. What do you think they should do?',
        'We want to make friendship bracelets for all our classmates, but it’s taking too long. How can we finish them faster?'
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
