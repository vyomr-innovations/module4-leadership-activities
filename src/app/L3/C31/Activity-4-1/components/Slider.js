'use client'

import './style.css'


import { useState } from 'react';

export default function Slider() {
    const [newObj, setNewObj] = useState([])
    const [currentObjIndex, setCurrentObjIndex] = useState(0)

    const obj = [
        'I see why you think that making new friends is important because it helps us meet new people and learn different things',
        'But I feel differently because old friends already know and understand us, and strong friendships take time to build.',
        'I guess we both agree that friendships : whether old or new, are important for having fun and supporting each other!'
    ]
    const scenario = "Making New Friends vs. Sticking with Old Friends";

    const statement = "Making new friends is more important than sticking with old friends!"

    const handleNext = () => {
        setNewObj((prevNewObj) => [...prevNewObj, obj[currentObjIndex]])
        setCurrentObjIndex(prevCurrentObjIndex => prevCurrentObjIndex + 1)
    }

    const f1 = "Acknowledge the other person’s opinion"
    const f2 = "Share your own perspective without judging"
    const f3 = "Find Common Ground"

    return (
        <div className='slidesMainContainer'>
            <h1 className='scenario'>Scenario : {scenario}</h1>
            <h1 className='statement'>Statement : {statement}</h1>
            {newObj.map((obj, index) => (
                <div key={index} className="listCon">
                    {index === 0 ? (
                        <h2>{f1}</h2>
                    ) : index === 1 ? (
                        <h2>{f2}</h2>
                    ) : index === 2 ? (
                        <h2>{f3}</h2>
                    ) : null}
                    <h1>{obj}</h1>
                </div>
            ))}
            {newObj.length != obj.length &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
