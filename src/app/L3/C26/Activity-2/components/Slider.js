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
        'The Group Poster Project',
        'The Tug-of-War Game',
        'The Relay Race Challenge',
        'The School Fundraiser Bake Sale'
    ]

    const objSubHeading = [
        "Your teacher assigns a group poster project about environmental awareness. There are four students in your group: Emma, Liam, Alex, and Mia. Emma and Liam are working hard, but Alex and Mia are barely contributing. Mia is playing on her tablet, and Alex keeps saying, 'They’ve got it covered. I don’t need to do much.' As the deadline approaches, Emma and Liam feel frustrated because they are doing all the work.",
        "At recess, the teacher organizes a tug-of-war game. Two teams of six players each are formed. When practicing with just two players, everyone pulls with full strength. But when all six players join, some : like Ryan and Zoe, stop pulling as hard. They assume the stronger players will handle it. The team loses because not everyone is giving their best effort.",
        "During sports day, teams are running a relay race. Everyone is excited and running fast, but Liam, the third runner, sees that his team is already behind. He thinks, 'We’re probably going to lose anyway, so I don’t need to run that fast.' Instead of sprinting, he slows down, assuming Sophia, the last runner, will make up for it. But because of this, the team falls further behind and loses the race.",
        "A group of students is running a bake sale fundraiser. At first, everyone is helping, but after a while, some students stop working. They assume others will handle things, so they start chatting instead of helping customers. Soon, the stall is messy, and people are confused about prices because not enough students are actively working."
    ]

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <h1 className="heading">{objHeading[currentObj]}</h1>
            <div className='divContainer'>
                <h1 className='subHeading'>{objSubHeading[currentObj]}</h1>
                <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />
            </div>
            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
