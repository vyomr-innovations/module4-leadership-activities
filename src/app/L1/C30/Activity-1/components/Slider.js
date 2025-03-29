'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)
    const obj = [
        {
            img: S1,
            heading: "Tickling Too Much",
            text: "James and his friend Ethan are playing. James starts tickling Ethan, and they laugh at first. But then Ethan said, ‘Stop!’ James is having fun, so James wonders if he should keep tickling.",
            choices: [
                "Stop tickling and ask, ‘What should we play next?’",
                "Keep tickling because it was fun at first."
            ],
            choice1_CC: [
                "Ethan feels happy because you listened.",
                "James & Ethan both choose a new game and keep having fun.",
                "Ethan knows he can trust James.",
            ],
            choice2_CC: [
                "Ethan might feel annoyed or even upset.",
                "Ethan might not want to play with James anymore.",
                "An adult might remind James that it’s important to listen when someone says stop.",
            ],
            ans: 0
        },
        {
            img: S2,
            heading: "Sharing a Snack",
            text: "Isabella has a yummy snack, and her friend Lily asks if she can have some. Isabella really likes her snack and doesn't want to share, but Isabella also doesn't want Lily to feel left out.",
            choices: [
                "Isabella keeps the snack for herself.",
                "Isabella shares a little bit of her snack with Lily."
            ],
            choice1_CC: [
                "Lily might feel left out or sad.",
                "Lily might not want to share anything with Isabella next time.",
            ],
            choice2_CC: [
                "Lily feels happy.",
                "Isabella & Lilly enjoy the snack together.",
                "Lily may share something with Isabella next time!",
            ],
            ans: 1
        },
        {
            img: S3,
            heading: "Screen Time vs. Family Time",
            text: "Ava is watching her favourite cartoon when her father asks if she would like to join him baking cookies together.",
            choices: [
                "Ava pauses the show and joins her father in the kitchen.",
                "Ava tells her father that she wants to finish your show first."
            ],
            choice1_CC: [
                "Ava spends fun time with her father.",
                "Ava learns how to bake and help in the kitchen.",
                "Ava still might have time to watch her show later.",
            ],
            choice2_CC: [
                "Ava gets to finish watching her favourite show.",
                "Ava’s father might start baking without her.",
                "Ava misses out on family time and learning something new.",
            ],
            ans: 0
        }
    ]

    const [tempChoice1_CC, setTempChoice1_CC] = useState([])
    const [tempChoice2_CC, setTempChoice2_CC] = useState([])

    const handleNext = () => {
        setCurrentObjIndex(currentObjIndex + 1)
        setTempChoice1_CC([])
        setTempChoice2_CC([])
    }


    const handleOptSelected = (optSelected) => {
        let temp_choice = []
        if (optSelected === 0) {
            temp_choice = obj[currentObjIndex]["choice1_CC"]
            setTempChoice1_CC(temp_choice)
        } else if (optSelected === 1) {
            temp_choice = obj[currentObjIndex]["choice2_CC"]
            setTempChoice2_CC(temp_choice)
        }
    }

    return (
        <div className="slidesMainContainer flex flex-col items-center text-center space-y-4">
            <h1 className="heading">{obj[currentObjIndex]["heading"]}</h1>

            <div className="flex flex-row items-center space-x-6">
                <Image
                    alt="currentObj"
                    className="currentObj w-1/2 max-w-xs"
                    src={obj[currentObjIndex]["img"]}
                />
                <h1 className="subHeading text-left w-1/2">{obj[currentObjIndex]["text"]}</h1>
            </div>

            <div className="optMainCon w-full flex justify-center space-x-4">
                {obj[currentObjIndex]["choices"].map((choice, index) => (
                    <div key={index} className="optMainCon2 flex flex-col items-center justify-center">
                        <button
                            onClick={() => handleOptSelected(index)}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-800 max-w-[250px] transition-all">
                            {choice}
                        </button>

                        <ul className="list-disc pl-5 mt-2 min-h-[100px] transition-all duration-300 ease-in-out">
                            {index === 0 && tempChoice1_CC.map((choice1_cc, index1_cc) => (
                                <div key={index1_cc} >
                                    {index1_cc === 0 && <p className='text-left font-semibold'>Consequence</p>}
                                    <li className="text-gray-700 text-left">{choice1_cc}</li>
                                </div>
                            ))}
                            {index === 1 && tempChoice2_CC.map((choice2_cc, index2_cc) => (
                                <div key={index2_cc} >
                                    {index2_cc === 0 && <p className='text-left font-semibold'>Consequence</p>}
                                    <li className="text-gray-700 text-left">{choice2_cc}</li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>


            {tempChoice1_CC.length > 0 && tempChoice2_CC.length > 0 && currentObjIndex < obj.length - 1 && (
                <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                    Next
                </button>
            )}
        </div>
    );
}
