'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [iStatement, setIStatement] = useState('')
    const [err, setErr] = useState(false)
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        S1,
        S2,
        S3
    ]

    const objHeading = [
        'Left Out at Lunch',
        'Sibling Borrows His Book Without Asking',
        'Friend Cancels Plans at the Last Minute'
    ]

    const objSubHeading = [
        "Mia always sits with her best friend, Olivia, at lunch. But today, Olivia went ahead without her and sat with someone else. Mia feels left out and upset. She angrily says, 'You ignored me and left me out on purpose! You don’t care about our friendship!' Olivia looks surprised and doesn’t know what to say.",
        "Ethan’s younger brother, Noah, took his favorite book without asking and accidentally damaged the cover. When Ethan sees it, he yells, 'You always take my things without asking! You ruined my book!' Noah looks down and upset.",
        "Liam and his friend, Jake, planned to go to the park together, but at the last minute, Jake cancels without giving a clear reason. Liam, feeling frustrated, messages Jake, 'You don’t care about our plans! You always cancel at the last minute!' Jake sees the message but doesn’t reply."
    ]

    const handleNext = () => {
        if (iStatement == "") {
            setErr(true)
        } else {
            setErr(false)
            setIStatement('')
            setCurrentObj(currentObj + 1)
        }
    }

    const iStatementChange = (e) => {
        const val = e.target.value
        setErr(false)
        setIStatement(val)
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
                    {err &&
                        <p className='text-[20px] bg-red-500 w-[200px] mb-2 p-1 rounded-full text-center font-semibold'>Input required*</p>
                    }
                    <input
                        value={iStatement}
                        onChange={(e) => iStatementChange(e)}
                        type="text" placeholder='I Statement' />
                </div>
            </div>

            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
