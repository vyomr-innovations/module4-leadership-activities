import { useState } from 'react';
import './style.css';
import Image from 'next/image'; // Importing Image component if using Next.js

import Lily from '../assets/challanges/c1.jpeg';
import Max from '../assets/challanges/c2.jpeg';
import Ethan from '../assets/challanges/c3.jpeg';

export default function Challenges() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0);

    const obj = [
        {
            heading: 'If Max is sick and can’t finish his part, who should take over research?',
            options: [
                { name: 'Lily', img: Lily, skills: ['Great at drawing and designing.'] },
                { name: 'Ethan', img: Ethan, skills: ['Very organized and good at writing neatly.'] }
            ],
            ans: 1
        },
        {
            heading: 'If at the last moment, the teacher asks the team to present the presentation, who is the right choice?',
            options: [
                { name: 'Lily', img: Lily, skills: ['Great at drawing and designing.'] },
                { name: 'Max', img: Max, skills: ['Knows a lot about space and science.'] },
                { name: 'Ethan', img: Ethan, skills: ['Very organized and good at writing neatly.'] }
            ],
            ans: 1
        }
    ];

    const handleOptSelection = (selectedOption) => {
        if (obj[currentObjIndex]["ans"] == selectedOption) {
            alert('Yeh! The answer is correct')
            setCurrentObjIndex((prevIndex) => prevIndex + 1)
        } else {
            alert('Oops! The answe is incorrect')
        }
    }

    return (
        <div className="challengesContainer">
            <center>
                {currentObjIndex < obj.length ?
                    (
                        <>
                            <h1 className="heading">Challenge {currentObjIndex + 1}</h1>
                            <h2 className="subHeading">{obj[currentObjIndex].heading}</h2>

                            <div className='optionsContainer0'>
                                {obj[currentObjIndex].options.map((opt, index) => (
                                    <div key={index} className='optionsContainer' onClick={() => handleOptSelection(index)}>
                                        <h3 className='heading'>{opt.name}</h3>
                                        <Image src={opt.img} alt={opt.name} className='charImg' />
                                        <ul>
                                            {opt.skills.map((skill, idx) => (
                                                <li key={idx}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className='activityEndContainer'>
                            <h1 className='activityEndHeading'>The Activity is completed</h1>
                        </div>
                    )}
            </center>
        </div>
    );
}
