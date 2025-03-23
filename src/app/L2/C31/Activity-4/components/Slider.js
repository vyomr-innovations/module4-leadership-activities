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
        'The Line Cutter',
        'The Parent-Sibling Conflict',
        'The Bike Mix-Up'
    ]

    const objSubHeading = [
        'Liam is waiting in line for lunch at school when Jack suddenly cuts in front of him. Liam feels frustrated because he has been waiting his turn.',
        'Sophia and her younger brother, Lucas, both want to watch different TV shows. They start arguing. Their dad walks in and says, "Lucas can pick today because he’s younger." Sophia feels upset and thinks it’s unfair.',
        'Daniel leaves his bike outside his friend’s house while playing inside. When he comes back, he sees another kid, Ryan, riding it without asking.'
    ]

    const solutionObj = [
        [
            "Take a deep breath and stay calm instead of reacting immediately.",
            "Jack, I feel frustrated when people cut in line because we’re all waiting our turn.",
            "What are the possible solutions : Politely ask Jack to go back, Let it go and ignore it. Tell a teacher.",
            "The best choice is to ask Jack calmly to go back to his place.",
            "Even if Jack doesn’t listen, Liam "
        ],
        [
            "Take a deep breath instead of arguing with her dad.",
            "Dad, I feel disappointed because I also wanted a turn to pick a show.",
            "Possible solutions: Suggest taking turns fairly each day. Ask for a compromise, like watching part of both shows.Get angry and refuse to watch anything.",
            "The best choice is to calmly suggest a turn-taking system so both siblings get a fair chance.",
            "Even though she feels upset, Sophia does not yell or argue with her dad."
        ],
        [
            "Take a deep breath before reacting angrily.",
            "Ryan, I feel upset because this is my bike, and I wasn’t asked before you took it.",
            "Possible solutions: Ask Ryan politely to return the bike. Get upset and yell at Ryan. Talk to an adult if Ryan refuses.",
            "The best choice is to ask Ryan politely to return the bike and remind him to ask first next time.",
            "Even if Ryan didn’t realize it was wrong, Daniel speaks calmly and doesn’t overreact."
        ]
    ]


    const [currentSolutionObj, setCurrentSolutionObj] = useState([])


    const handleNext = () => {
        setCurrentSolutionObj([])
        setCurrentObj(currentObj + 1)
    }

    const updateSolution = () => {
        const len = currentSolutionObj.length;
        if (len < solutionObj[currentObj].length) {
            setCurrentSolutionObj([...currentSolutionObj, solutionObj[currentObj][len]]);
        }
    };

    const getSolutionHead = (index) => {
        if (index == 0) {
            return "STOP"
        }
        else if (index == 1) {
            return "SAY"
        }
        else if (index == 2) {
            return "THINK"
        }
        else if (index == 3) {
            return "CHOOSE"
        }
        else if (index == 4) {
            return "RESPECT"
        }

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
                    {currentSolutionObj.map((value, index) => (
                        <div key={index} className="bg-white text-black text-[19px] px-2 py-1 rounded-lg mb-5 solutionPara">
                            <p className='sp1'>{getSolutionHead(index)}</p>
                            <p className='sp2'>{value}</p>
                        </div>
                    ))}

                    <center>
                        <button onClick={updateSolution} className="mt-4 p-2 bg-yellow-500 text-black rounded-lg">
                            Update Solution
                        </button>
                    </center>
                </div>
            </div>

            {currentObj < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
