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
            heading: "The Juice Spill Secret",
            text: "Emma accidentally spilled juice on the carpet but didn’t tell anyone. She covered it with a towel and went back to watching TV.",
            twist: "Later, her little brother slipped near the spot. Emma rushed to help and admitted she had spilled the juice. Her parents were glad she told the truth and helped clean it together."
        },
        {
            img: S2,
            heading: "The Chore Shortcut",
            text: "Noah was supposed to take out the trash but only threw away the top layer to make it look like he did the job.",
            twist: "Later in the day when Noah’s dad took out the trash, he noticed the hole and thanked Noah for not making a mess. If Noah had lifted it all the way, it might have leaked onto the floor."
        },
        {
            img: S3,
            heading: "The Sneaky Snack",
            text: "Ethan was really hungry before dinner. His parents had said not to eat cookies, but he grabbed one anyway and ate it quickly.",
            twist: "Later, his parents found out but weren’t mad because Ethan was actually feeling weak from missing lunch. They realized he needed a better snack plan before dinner."
        }
    ]

    const [currentTwist, setCurrentTwist] = useState("")

    const handleNext = () => {
        setCurrentTwist("")
        setCurrentObjIndex(currentObjIndex + 1)
    }

    const exploreTwist = () => {
        setCurrentTwist(obj[currentObjIndex]["twist"])
    };




    return (
        <div className='slidesMainContainer'>
            <div className="flex gap-4">
                <div className="w-1/2 p-4 text-white__X leftCon">
                    <h1 className='headingOg'>{obj[currentObjIndex]["heading"]}</h1>
                    <h1 className="heading">{obj[currentObjIndex]["text"]}</h1>
                    <Image alt="currentObjIndex" className='currentObj' src={obj[currentObjIndex]["img"]} />

                </div>
                <div className="w-1/2 p-4 text-white__X rightCon">

                    {currentTwist !== "" &&
                        <h1 className='font-semibold text-[23px] text-cus1-500'><i>{currentTwist}</i></h1>
                    }

                    {currentTwist === "" &&
                        <center>
                            <button onClick={exploreTwist} className="buttonS1 mt-2 p-2">
                                Explore
                            </button>
                        </center>
                    }

                </div>
            </div>

            {currentTwist !== "" && currentObjIndex < obj.length - 1 &&
                <button className='buttonS1' onClick={handleNext}>Next</button>
            }
        </div>
    );
}
