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
        'Your group is working on a project, but two team members keep arguing about whose idea is better. The project deadline is tomorrow, and nothing is getting done.',
        'New student joins your class and looks nervous. They don’t know anyone, and they are sitting alone during lunch.',
        'Your team is playing in an important match, and the referee makes a call that seems unfair. Your teammates are frustrated and losing focus.',
        'You and your friends are on a hiking trip, but somehow, the group takes a wrong turn and gets lost. Some people are panicking, while others are arguing about which way to go.'
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
