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
        'The Spilled Juice Accident',
        'The Bedroom Cleanup Conflict',
        'The TV Show Disagreement',
        'The Last Cookie Dispute'
    ]

    const objSubHeading = [
        'Emma and Noah are having snack time. Noah accidentally bumps Emma’s juice, and it spills all over the table. Emma shouts, "You did that on purpose!" Noah looks shocked and says, "No, I didn’t!"',
        'Mia and her older brother, Lucas, share a bedroom. One evening, their mum asks them to clean up before dinner. Mia starts picking up her toys, but Lucas keeps playing with his video game. Frustrated, Mia says, “You never help! I have to do everything!”',
        'Zoe and her older brother Jake are watching TV. Zoe wants to watch cartoons, but Jake wants to watch a sports game. Jake grabs the remote and says, "I had it first!" Zoe crosses her arms and says, "That’s not fair!"',
        'Liam and his older sister, Sophie, see there’s only one cookie left on the plate. Liam reaches for it, but Sophie quickly grabs it first and says, "I got it first! It’s mine!" Liam frowns and says, "That’s not fair! I wanted it too!"'
    ]

    const solutionObj = [
        [
            "Emma takes a deep breath before reacting.",
            "Instead of blaming, she uses an 'I' statement: 'I feel frustrated because my juice spilled.'",
            "They think of ways to fix the situation—maybe cleaning up together or asking for help.",
            "Emma decided  to grab some napkins and clean up.",
            "Emma realizes it was an accident and says, It’s okay, let’s just clean it up!"
        ],
        [

            "Mia takes a deep breath and counts to three before reacting.",
            "Instead of blaming Lucas, she uses an 'I' statement: 'I feel upset because I need help cleaning our room.'",
            "They think of ways to solve the problem—maybe making it a fun game, setting a timer, or asking an adult for help.",
            "Mia says, 'Let’s race! Let’s see who can pick up five toys the fastest!' Lucas agrees and starts cleaning.",
            "Mia sees that Lucas is trying and says, 'Thanks for helping! Now we can play together before dinner!'"
        ],
        [
            "Zoe takes a deep breath.",
            "Instead of yelling, she says: I feel upset because I really wanted to watch cartoons.",
            "They think of a way to share the TV: Maybe they can take turns or watch together.",
            "Zoe suggests, How about we watch my show first, then your show?",
            "Jake agrees, and they find a fair way to share.",
        ],
        [
            "Liam takes a deep breath before reacting.",
            "Instead of arguing, Liam says: I feel sad because I really wanted a cookie too.",
            "They think of solutions: They could split the cookie, ask if more cookies are available, or take turns next time.",
            "Liam suggests, How about we break it in half and share?",
            "Sophie agrees, and they both enjoy the cookie happily.            ",
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
