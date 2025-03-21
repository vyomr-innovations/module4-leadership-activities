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
        'The Birthday Surprise!',
        ' The Lost Teddy',
        'The Missing Homework'
    ]

    const objSubHeading = [
        'Ella walks into the classroom and sees a big banner that says "Happy Birthday, Ella!" All her friends cheer and give her a handmade birthday card. Ella claps her hands and says, "Wow! This is the best surprise ever!"',
        'Liam brings his favorite teddy bear to school for show and tell. At the end of the day, he looks in his backpack, but the teddy bear is missing! He feels his eyes fill with tears, but then his teacher says, "Let’s all look for it together!" Liam takes a deep breath and nods.',
        'Ava thought she lost her homework and started to worry. She looked through her school bag again and again, but she couldn’t find it. Just as she was about to tell her teacher, she found it hiding in the back pocket of her folder. She let out a big sigh and smiled a little.'
    ]

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <div className="flex gap-4">
                <div className="w-1/2 bg-blue-500 p-4 text-white leftCon">
                    <h1 className='headingOg'>{objHeading[currentObj]}</h1>
                    <h1 className="heading">{objSubHeading[currentObj]}</h1>
                    <Image alt="currentObj" className='currentObj' src={obj[currentObj]} />

                </div>
                <div className="w-1/2 bg-green-500 p-4 text-white rightCon">
                    <input type="text" placeholder='Emotion Label' />
                </div>
            </div>

            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
