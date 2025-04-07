'use client'

import './style.css'


import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';

import { useState } from 'react';

export default function Slider() {
    const [currentObjIndex, setCurrentObjIndex] = useState(0)

    const obj = [
        {
            img: S1,
            heading: "The Fundraiser",
            subHeading: "Your class is raising money for a local animal shelter. You’ve baked cookies, collected donations, and set a goal to raise $500 to help buy food and blankets for rescued animals. But it’s been two weeks… and you’ve only raised $100. The shelter is counting on your support — and time is running out!"
        },
        {
            img: S2,
            heading: "The Snack Dare",
            subHeading: "Some kids at school were laughing about a party where someone ate a super spicy chip. You’re going to a birthday party this weekend, and one of those kids will be there. You’ve heard they like to dare others — like drinking weird mixes or eating hot sauce. You’re not sure what to do if they dare you too."
        }
    ]

    const solutionObj = [
        "Identify the Decision",
        "Identify Possible Outcomes",
        "Make the Decision",
        "Brainstorm Options",
        "Reflect on the Decision"
    ]



    const [currentSolutionObj, setCurrentSolutionObj] = useState([])


    const handleNext = () => {
        setCurrentSolutionObj([])
        setCurrentObjIndex(currentObjIndex + 1)
    }

    const updateSolution = () => {
        const len = currentSolutionObj.length;
        if (len < solutionObj.length) {
            setCurrentSolutionObj([...currentSolutionObj, solutionObj[len]]);
        }
    };


    return (
        <div className='slidesMainContainer'>
            <div className="flex gap-4">
                <div className="w-1/2 bg-blue-500 p-4 text-white leftCon">
                    <h1 className='headingOg'>{obj[currentObjIndex]["heading"]}</h1>
                    <h1 className="heading">{obj[currentObjIndex]["subHeading"]}</h1>
                    <Image alt="currentObjIndex" className='currentObj' src={obj[currentObjIndex]["img"]} />

                </div>
                <div className="w-1/2 bg-green-500 p-4 text-white rightCon">
                    {currentSolutionObj.map((value, index) => (
                        <div key={index} className="bg-white text-black text-[19px] px-2 py-1 rounded-lg mb-5 solutionPara">
                            <p className='sp2 font-semibold text-[20px]'>{index+1}{'. '}{value}</p>
                        </div>
                    ))}

                    {currentSolutionObj.length < solutionObj.length &&
                        <center>
                            <button onClick={updateSolution} className="mt-4 p-2 bg-yellow-500 text-black rounded-lg">
                                Update Solution
                            </button>
                        </center>
                    }

                </div>
            </div>

            {currentObjIndex < obj.length - 1 &&
                <button onClick={handleNext}>Next</button>
            }
        </div>
    );
}
