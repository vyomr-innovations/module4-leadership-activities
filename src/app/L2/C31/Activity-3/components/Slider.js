'use client'

import './style.css'
import Image from 'next/image'
import S1 from '../assets/s1.jpeg';
import S2 from '../assets/s2.jpeg';
import S3 from '../assets/s3.jpeg';
import { useState } from 'react';

export default function Slider() {
    const [currentObj, setCurrentObj] = useState(0);
    const [progress, setProgress] = useState(0);
    const [revealedValues, setRevealedValues] = useState([]);

    const obj = [S1, S2, S3];

    const objHeading = [
        'The Loud Younger Sibling',
        'The Soccer Game Mix-Up',
        'The Party Mix-Up'
    ];

    const objSubHeading = [
        'Emma is reading a comic, but her little brother, Noah, is playing loudly nearby. She feels frustrated because she can’t concentrate.',
        'Liam’s team is playing soccer. Mia kicks the ball the wrong way, and the other team scores. Alex yells, ‘Mia, you’re terrible at this game!’ Mia looks sad and walks away.',
        'At his cousin’s party, Ethan plays musical chairs. When the music stops, Kai bumps into him and takes the last chair. Kai cheers, ‘I won!’ Ethan feels frustrated.'
    ];

    const toleranceQtyObj = [
        ["Patience", "Understanding"],
        ["Empathy", "Fairness"],
        ["Self-Control", "Understanding Perspective"]
    ];

    const handleNext = () => {
        if (currentObj < obj.length - 1) {
            setCurrentObj(currentObj + 1);
            let update = updateToleranceQtyObj()
            if(update){
                updateProgress()
            }
        }
    };

    const updateProgress = () => {
        const update = updateToleranceQtyObj();
        if (update) {
            let newProgress = (currentObj + 1) * 33; // 0 → 33, 33 → 66, 66 → 100
            setProgress(newProgress);
            setRevealedValues([...revealedValues, ...toleranceQtyObj[currentObj]]);
        }
    };

    const updateToleranceQtyObj = () => {
        let update = false;
        for (let i = 0; i < revealedValues.length; i++) {
            if (toleranceQtyObj[currentObj].includes(revealedValues[i])) {
                return update;
            }
        }
        update = true;
        return update;
    };

    const getGradient = () => {
        if (progress < 33) {
            return "from-blue-500 to-cyan-400"; // Start color
        } else if (progress < 66) {
            return "from-cyan-400 to-yellow-400"; // Midway color
        } else {
            return "from-yellow-400 to-red-500"; // Near completion
        }
    };

    return (
        <div className="slidesMainContainer">
            <div className="flex gap-4">
                {/* Left Content - Image & Story */}
                <div className="w-[70%] bg-blue-500 p-4 text-white leftCon">
                    <h1 className="headingOg">{objHeading[currentObj]}</h1>
                    <h1 className="heading">{objSubHeading[currentObj]}</h1>
                    <Image alt="currentObj" className="currentObj" src={obj[currentObj]} />
                </div>

                {/* Right Content - Progress Bar & Values */}
                <div className="w-[30%] bg-green-500 p-4 text-white rightCon flex flex-col items-center">
                    <h1 className='text-[25px] font-semibold'>Tolerance Qualities</h1>
                    {/* Progress Bar & Tolerance Values in One Row */}
                    <div className="flex items-center gap-4 w-full">
                        {/* Progress Bar */}
                        <div className="w-6 bg-gray-300 h-100 rounded-lg relative">
                            <div
                                className={`absolute bottom-0 left-0 w-6 rounded-lg transition-all duration-500 bg-gradient-to-b ${getGradient()}`}
                                style={{ height: `${progress}%` }}
                            ></div>
                        </div>

                        {/* Revealed Tolerance Values */}
                        <div className="flex flex-col gap-2">
                            {revealedValues.map((value, index) => (
                                <p key={index} className="bg-white text-black px-2 py-1 rounded-lg">
                                    {value}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Button to Update Progress */}
                    {progress < 100 && (
                        <button onClick={updateProgress} className="mt-4 p-2 bg-yellow-500 text-black rounded-lg">
                            Update Progress
                        </button>
                    )}
                </div>
            </div>

            {/* Next Button */}
            {currentObj < obj.length - 1 && (
                <button onClick={handleNext} className="mt-4 p-2 bg-gray-700 text-white rounded-lg">
                    Next
                </button>
            )}
        </div>
    );
}
