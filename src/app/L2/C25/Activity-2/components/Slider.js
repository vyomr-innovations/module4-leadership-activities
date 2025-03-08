'use client'

import './style.css'


import Image from 'next/image'
import Teacher from '../assets/teacher.jpeg';
import Ff from '../assets/ff.jpeg';
import Doctor from '../assets/doctor.jpeg';
import BassP from '../assets/bassP.jpeg';
import ZooK from '../assets/zooK.jpeg';
import Cashier from '../assets/cashier.jpeg';
import SHelp from '../assets/sHelp.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0)
    const obj = [
        "Empathy",
        "Teamwork",
        "Determination",
        "Responsibility",
        "Confidence"
    ]

    const objHeading = [
        'Empathy means understanding and caring about how others feel. A leader with empathy listens, supports, and helps others in need. They don’t ignore someone who is upset, they try to help!',
        'Teamwork means working together and making sure everyone gets a chance to help. Good leaders support their team and share responsibilities.',
        'Determination means never giving up, even when something is hard. A leader keeps trying and encourages others to do the same.',
        'Humility means not bragging and giving credit to others. A humble leader listens and learns instead of showing off.',
        'Being responsible means keeping promises, making good choices, and setting a good example for others.',
        'Confidence means believing in yourself and your ideas. A confident leader speaks up, tries new things, and encourages others to do the same.',
    ]

    // (Is this leadership, or just kindness? Can small actions make someone a leader?)

    const handleNext = () => {
        setCurrentObj(currentObj + 1)
    }


    return (
        <div className='slidesMainContainer'>
            <p className='heading'>
                {obj[currentObj]}
            </p>
            <h1 className="subHeading">{objHeading[currentObj]}</h1>
            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
