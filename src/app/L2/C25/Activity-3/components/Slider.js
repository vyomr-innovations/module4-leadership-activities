'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import S4 from '../assets/s4.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        S1,
        S2,
        S3,
        S4
    ]

    const objHeading = [
        'Your group is working on a class project, but one team member has stopped working.',
        'Your group is making a poster for a class project, but one student keeps taking over and not letting others contribute. Some group members feel left out.',
        'Your class is preparing for a group performance, but some students are nervous and afraid they will forget their lines. They don’t want to go on stage.',
        'Your family and friends are at the beach when you notice a group of younger kids playing too close to deep water. There are no adults nearby watching them.'
    ]

    // (Is this leadership, or just kindness? Can small actions make someone a leader?)

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{objHeading[currentObj]}</h1>
            <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />
            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
