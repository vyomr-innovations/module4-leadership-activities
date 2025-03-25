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
        'The Group Project',
        'The Forgotten Birthday Invite',
        'The Messy Room'
    ]

    const objSubHeading = [
        'Sophie and Jack were supposed to work together on a class project. Jack didn’t do his part, and Sophie had to finish everything by herself. Later Sophie said, "Jack, you are so lazy! You never do any work!" Jack got upset.',
        'Olivia had a birthday party and invited many classmates, but she forgot to invite Mia. Mia felt hurt when she found out. The next day, she told Olivia, "You are so mean! You didn’t invite me on purpose!" Olivia looked surprised.',
        'Nora and her older sister Emma share a bedroom. Emma often leaves her clothes and books all over the floor. One day, Nora got frustrated and said, "Emma, you are so messy! You never clean up after yourself!" Emma feels defensive and unwilling to listen.'
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
