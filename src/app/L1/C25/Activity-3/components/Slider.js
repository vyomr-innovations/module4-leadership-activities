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
        Teacher,
        Ff,
        BassP,
        ZooK,
        Cashier,
        SHelp
    ]
    
    const objHeading = [
        'A teacher in a classroom.',
        'A firefighter courageously rescuing people.',
        'A basketball team captain delivering a motivational speech to their teammates before a game.',
        'A zookeeper feeding animals in a zoo.',
        'A cashier scanning groceries at a supermarket.',
        'Ron helping Ria who fell on the playground.'
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
