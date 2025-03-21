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
        'The Broken Tower',
        'The Missing Pencil',
        'Sharing a Toy'
    ]

    const objSubHeading = [
        'Lily and Max are building a block tower together. Max accidentally knocks it over while reaching for a block. Lily says, "You ruined it! You always mess things up!" Max looks upset and stops playing.',
        'Sophia sits down to start her work but realizes her pencil is missing. She sees Oliver using a pencil that looks just like hers. She frowns and says, "You took my pencil! Give it back!" Oliver looks surprised and says, "No, I didn’t!"',
        'Emma and Jack both want to play with the same teddy bear during playtime. Jack grabs it first, and Emma says, "You always take the best toys! That’s not fair!" Jack looks annoyed and hugs the teddy bear tightly.'
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
